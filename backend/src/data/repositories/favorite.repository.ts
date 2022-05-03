import { getRepository } from 'typeorm';
import { Favorite, User } from 'data/models';
import { NotFound } from 'server/utils/errors';
import { UserRepository } from '.';

export default class FavoriteRepository {
  static async create(createBody: { characterId: number; user: User }): Promise<Favorite> {
    const {
      user: { id },
    } = createBody;
    const exists: User = await UserRepository.get(id);
    if (!exists) throw new NotFound(`User with id ${id} doesn't exists`);
    const favoriteRepository = getRepository(Favorite);
    const createdFavorite: Favorite = favoriteRepository.create(createBody);
    return favoriteRepository.save(createdFavorite);
  }

  static getByUserId(id: string, characterId: number): Promise<Favorite> {
    const favoriteRepository = getRepository(Favorite);
    return favoriteRepository.findOne({
      where: { characterId, user: { id } },
      loadRelationIds: true,
      relations: ['user'],
    });
  }

  static getAll(filters: any): Promise<Array<Favorite>> {
    const favoriteRepository = getRepository(Favorite);
    return favoriteRepository.find({
      where: filters,
      loadRelationIds: true,
      relations: ['user'],
    });
  }

  static async destroy(destroyBody: { characterId: number; user: User }): Promise<Favorite | void> {
    const { characterId, user } = destroyBody;
    const favoriteRepository = getRepository(Favorite);
    const foundFavorite = await favoriteRepository.findOne({
      loadRelationIds: true,
      relations: ['user'],
      where: { characterId, user: { id: user.id } },
    });
    if (!foundFavorite)
      throw new NotFound(`User ${user.id} doesn't have character ${characterId} favorited.`);
    await favoriteRepository.delete(foundFavorite.id);
    return foundFavorite;
  }
}
