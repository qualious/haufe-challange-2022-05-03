import { User } from 'data/models';
import { UserRepository } from 'data/repositories';

export default class UserService {
  static create(createBody: { email: string; password: string; salt: string }): Promise<User> {
    return UserRepository.create(createBody);
  }

  static destroy(destroyBody: {
    id: string;
    email: string;
    password: string;
    salt: string;
  }): Promise<User | void> {
    return UserRepository.destroy(destroyBody);
  }

  static getWithPasswordAndSalt(id: string, email: string): Promise<User> {
    return UserRepository.getWithPasswordAndSalt(id, email);
  }

  static verifyPassword(email: string, password: string): Promise<User> {
    return UserRepository.verifyPassword(email, password);
  }
}
