import { app } from 'server/app';
import { User } from 'data/models';
import { buildUser } from './factories';
import { Character } from 'data/types/api.type';
import request, { SuperAgentTest } from 'supertest';
import { Database, setUpRoutesAndMiddlewares } from './utils';
import RickyController from 'server/controllers/ricky.controller';

const USER: Readonly<string> = '/user' as const;
const ENDPOINT: Readonly<string> = '/ricky' as const;
const LOGIN: Readonly<string> = '/auth/login' as const;

describe('Ricky tests', () => {
  let cookie: string;
  let agent: SuperAgentTest;
  let loggedInUser: Partial<User>;

  beforeAll(async () => {
    await Database.startDatabase();
    setUpRoutesAndMiddlewares();
    agent = request.agent(app);
    loggedInUser = await buildUser({});
    await agent.post(USER).send(loggedInUser).expect(201);
    await agent
      .post(LOGIN)
      .send(loggedInUser)
      .expect(200)
      .then((res) => {
        const {
          headers,
          body: {
            data: { id },
          },
        } = res;
        loggedInUser = { ...loggedInUser, id };
        cookie = headers['set-cookie'][0].replace('HttpOnly; ', '');
      });
  });

  afterAll(async () => {
    await Database.dropDatabase();
  });

  test('/GET/?page={1} - Response with characters', async () => {
    const page: number = 1;
    const response = await agent.get(ENDPOINT).query({ page }).set('Cookie', cookie);
    expect(response.status).toBe(200);
    expect(response.statusCode).toBe(200);
    const {
      data: { info, results },
    } = response.body;
    expect(info.count).toBeTruthy();
    expect(info.pages).toBeTruthy();
    expect(info.next).toBeTruthy();
    expect(info.prev).toBeNull();
    expect(Array.isArray(results)).toBe(true);
    expect(info.next).toBe(`${RickyController.apiBaseUrl}/character/?page=${page + 1}`);
  });

  test('/GET/{id} - Response with character', async () => {
    const response = await agent.get(`${ENDPOINT}/1`).set('Cookie', cookie);
    expect(response.status).toBe(200);
    expect(response.statusCode).toBe(200);
    const {
      data: { id, name, status, location, image, favorite },
    } = response.body;
    expect(id).toBeTruthy();
    expect(name).toBeTruthy();
    expect(status).toBeTruthy();
    expect(location).toBeTruthy();
    expect(image).toBeTruthy();
    expect(favorite).toBe(false);
  });

  test('/GET/* - Response with favorited character', async () => {
    const characterId: number = 2;
    const response = await agent.post('/favorite/').set('Cookie', cookie).send({ characterId });
    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);
    const {
      data: {
        characterId: charId,
        user: { id: userId },
      },
    } = response.body;
    expect(charId).toBe(characterId);
    expect(userId).toBe(loggedInUser.id);

    const all = await agent.get(ENDPOINT).query({ page: 1 }).set('Cookie', cookie);
    expect(all.status).toBe(200);
    expect(all.statusCode).toBe(200);
    const {
      data: { results },
    } = all.body;
    expect(Array.isArray(results)).toBe(true);
    const found: Character = results.find((result: Character) => result.id === characterId);
    expect(found).toBeTruthy();
    expect(found.favorite).toBe(true);
    const detail = await agent.get(`${ENDPOINT}/${characterId}`).set('Cookie', cookie);
    expect(detail.status).toBe(200);
    expect(detail.statusCode).toBe(200);
    const {
      data: { id, favorite },
    } = detail.body;
    expect(id).toBe(characterId);
    expect(favorite).toBe(true);
  });
});
