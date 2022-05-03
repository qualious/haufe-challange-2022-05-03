import { app } from 'server/app';
import request, { SuperAgentTest } from 'supertest';
import { User } from 'data/models';
import { UserService } from 'server/services';
import { buildUser, createUser } from './factories';
import { Database, setUpRoutesAndMiddlewares } from './utils';
import { getRepository } from 'typeorm';

const ENDPOINT: Readonly<string> = '/user' as const;
const LOGIN: Readonly<string> = '/auth/login' as const;

describe('User tests', () => {
  let cookie: string;
  let agent: SuperAgentTest;
  let loggedInUser: Partial<User>;
  beforeAll(async () => {
    await Database.startDatabase();
    setUpRoutesAndMiddlewares();
    agent = request.agent(app);
    loggedInUser = await buildUser({});
    await agent.post(ENDPOINT).send(loggedInUser).expect(201);
    await agent
      .post(LOGIN)
      .send(loggedInUser)
      .expect(200)
      .then(async (res) => {
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

  test('/POST - Response with a newly created user', async () => {
    const fakedUser = await buildUser({});
    const response = await agent.post(ENDPOINT).set('Cookie', cookie).send(fakedUser);
    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);
    const user: User = await UserService.getWithPasswordAndSalt(null, fakedUser.email);
    expect(user.email).toBe(fakedUser.email);
    expect(UserService.verifyPassword(user.email, fakedUser.password)).resolves;
  });

  test('/DELETE - Response with a deleted user', async () => {
    const userRepository = getRepository(User);
    const response = await agent.delete(ENDPOINT).set('Cookie', cookie).send();
    const {
      status,
      body: { data },
    } = response;
    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
    expect(data.id).toBe(loggedInUser.id);
    const deletedUser = await userRepository.findOne(loggedInUser.id);
    expect(deletedUser).toBe(undefined);
  });

  test('/DELETE - User does not exists, user cant be deleted', async () => {
    const userRepository = getRepository(User);
    const user = await buildUser({}, true);
    const fakeUser = await createUser(user);
    const { id } = fakeUser;
    await userRepository.delete(id);
    const response = await agent.delete(ENDPOINT).set('Cookie', cookie);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
