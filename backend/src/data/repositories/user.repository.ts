import crypto from 'crypto';
import { User } from 'data/models';
import { getRepository } from 'typeorm';
import { NotFound } from 'server/utils/errors';

export default class UserRepository {
  static async create(createBody: {
    email: string;
    password: string;
    salt: string;
  }): Promise<User> {
    const userRepository = getRepository(User);
    const createdUser: User = userRepository.create(createBody);
    return userRepository.save(createdUser);
  }

  static get(id: string) {
    const userRepository = getRepository(User);
    return userRepository.findOne({
      where: { id },
      relations: ['favorites'],
    });
  }
  static getWithPasswordAndSalt(id: string, email: string): Promise<User> {
    const userRepository = getRepository(User);
    const select = userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .addSelect('user.salt')
      .leftJoinAndSelect('user.favorites', 'favorite');
    if (id) {
      select.where('user.id = :id', { id });
      if (email) {
        select.andWhere('user.email = :email', { email });
      }
    } else if (email) select.where('user.email = :email', { email });
    return select.getOne();
  }

  static async verifyPassword(email: string, password: string): Promise<User> {
    const user: User = await this.getWithPasswordAndSalt(null, email);
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

  static async destroy(destroyBody: {
    id: string;
    email: string;
    password: string;
    salt: string;
  }): Promise<User | void> {
    const { id } = destroyBody;
    const userRepository = getRepository(User);
    const user: User = await userRepository.findOne(id);
    if (!user) throw new NotFound(`User with primary key ${id} not found`);
    await userRepository.delete(id);
    return user;
  }
}
