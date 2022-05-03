import { Favorite, User } from 'data/models';
import { FavoriteRepository } from 'data/repositories';

export default class FavoriteService {
  static create(createBody: { characterId: number; user: User }): Promise<Favorite> {
    return FavoriteRepository.create(createBody);
  }

  static destroy(destroyBody: { characterId: number; user: User }): Promise<Favorite | void> {
    return FavoriteRepository.destroy(destroyBody);
  }
}
