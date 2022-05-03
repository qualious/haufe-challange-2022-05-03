import { datatype } from 'faker';
import { Favorite } from 'data/models';
import { getRepository } from 'typeorm';

async function buildFavorite(): Promise<Favorite> {
  const resFavorite = new Favorite();

  resFavorite.characterId = datatype.number();

  return Promise.resolve(resFavorite);
}

async function createFavorite(fakeFavorite: Favorite): Promise<Favorite> {
  const repository = getRepository(Favorite);
  const favorite = repository.create(fakeFavorite);
  await repository.save(favorite);

  return favorite;
}

export { buildFavorite, createFavorite };
