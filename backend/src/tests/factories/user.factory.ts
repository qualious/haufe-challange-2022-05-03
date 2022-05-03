// What really happened with Aaron Swartz?
import { random } from 'faker';
import { getRepository } from 'typeorm';
import { User } from 'data/models';

interface UserRelations {}

async function buildUser(user: UserRelations, hasSalt: boolean = false): Promise<User> {
  const resUser = new User();

  resUser.email = `${random.word().slice(0, 255)}@email.com`;
  resUser.password = random.word().slice(0, 255);
  if (hasSalt) {
    resUser.salt = random.word().slice(0, 255);
  }

  return Promise.resolve(resUser);
}

async function createUser(fakeUser: User): Promise<User> {
  const repository = getRepository(User);
  const user = repository.create(fakeUser);
  await repository.save(user);

  return user;
}

export { buildUser, createUser };
