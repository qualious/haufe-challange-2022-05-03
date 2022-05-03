import { app } from 'server/app';
import { getRepository } from 'typeorm';
import { Favorite, User } from 'data/models';
import request, { SuperAgentTest } from 'supertest';
import { buildFavorite, buildUser } from './factories';
import { Database, setUpRoutesAndMiddlewares } from './utils';

const USER: Readonly<string> = '/user' as const;
const ENDPOINT: Readonly<string> = '/favorite' as const;
const LOGIN: Readonly<string> = '/auth/login' as const;

describe('Favorite tests', () => {
  let cookie: string;
  let agent: SuperAgentTest;
  let loggedInUser: Partial<User>;

  beforeAll(async () => {
    await Database.startDatabase();
    setUpRoutesAndMiddlewares();
    agent = request.agent(app);
  });

  beforeEach(async () => {
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

  test('/POST - Response with a new created favorite', async () => {
    const favoriteRepository = getRepository(Favorite);
    const fakeFavorite = await buildFavorite();
    const response = await agent.post(ENDPOINT).set('Cookie', cookie).send(fakeFavorite);
    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);
    const responseFavorite = response.body.data;
    const favorite = await favoriteRepository.findOne(responseFavorite.id, {
      relations: ['user'],
    });
    expect(favorite.characterId).toBe(fakeFavorite.characterId);
    expect(favorite.user.id).toBe(loggedInUser.id);
  });

  test('/POST - User does not exist, favorite cant be created', async () => {
    const userRepository = getRepository(User);
    const favorite = await buildFavorite();
    await userRepository.delete(loggedInUser.id);
    const response = await agent.post(ENDPOINT).set('Cookie', cookie).send(favorite);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/DELETE - Response with a deleted favorite', async () => {
    const favoriteRepository = getRepository(Favorite);
    const favorite = await buildFavorite();
    const create = await agent.post(ENDPOINT).set('Cookie', cookie).send(favorite);
    const response = await agent.delete(ENDPOINT).set('Cookie', cookie).send(favorite);
    const {
      data: { id },
    } = create.body;
    const {
      status,
      body: { data },
    } = response;
    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
    expect(data.id).toBe(id);
    const deletedFavorite = await favoriteRepository.findOne(id);
    expect(deletedFavorite).toBe(undefined);
  });

  test('/DELETE - Favorite does not exists, favorite cant be deleted', async () => {
    const favoriteRepository = getRepository(Favorite);
    const favorite = await buildFavorite();
    const create = await agent.post(ENDPOINT).set('Cookie', cookie).send(favorite);
    const {
      data: { id },
    } = create.body;
    await favoriteRepository.delete(id);
    const response = await agent.delete(ENDPOINT).set('Cookie', cookie).send(favorite);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
