import crypto from 'crypto';
import { User } from 'data/models';
import { UserRepository } from 'data/repositories';
import { NotFound } from 'server/utils/errors';

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

  static async verifyPassword(email: string, password: string): Promise<User> {
    const user: User = await UserRepository.getWithPasswordAndSalt(null, email);
    if (!user) throw new NotFound(`User with email ${email} not found`);
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, user.salt, 310000, 64, 'sha512', (error, hashed) => {
        if (error) {
          return reject();
        }
        if (
          !crypto.timingSafeEqual(Buffer.from(user.password), Buffer.from(hashed.toString('hex')))
        ) {
          return reject();
        }
        return resolve(user);
      });
    });
  }
}
