import { OK } from 'http-status';
// NOTE: Could've used node-fetch as well. Also, node.v18+ will include fetch natively!
// As of writing, no LTS support for that version unfortunately.
// https://nodejs.org/en/about/releases/
import axios, { AxiosResponse } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { CharacterListResponse, Character } from 'data/types/api.type';
import { Favorite } from 'data/models';
import { FavoriteRepository } from 'data/repositories';

/*
 * NOTE: There is a JavaScript client for Rick and Morty API.
 * I'm assuming you guys would like to see a manual implementation.
 * Normally, I would've used the library instead. Maybe. It depends.
 * LINK: https://github.com/afuh/rick-and-morty-api-node
 */
export default class RickyController {
  public static apiBaseUrl: Readonly<string> = 'https://rickandmortyapi.com/api' as const;
  static async getAll(req: Request, res: Response, next: NextFunction) {
    const page: number = Number(req.query.page);
    const url: string = `${RickyController.apiBaseUrl}/character/?page=${page}`;
    try {
      const response: AxiosResponse<CharacterListResponse> = await axios.get<CharacterListResponse>(
        url,
      );
      if (response.status == OK) {
        const {
          data: { info, results },
        } = response;
        const favorites: Array<Favorite> = await FavoriteRepository.getAll({
          user: { id: req.user.id },
        });
        res.locals.data = {
          info,
          results: results.map((character: Character) => ({
            ...character,
            favorite: favorites.findIndex((fav: Favorite) => fav.characterId === character.id) > -1,
          })),
        };
      } else {
        const { statusText } = response;
        res.locals.data = statusText;
      }
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    const id: number = Number(req.params.id);
    const url: string = `${RickyController.apiBaseUrl}/character/${id}`;
    try {
      const response: AxiosResponse<Character> = await axios.get<Character>(url);
      if (response.status == OK) {
        const { data: character } = response;
        const exists: Favorite = await FavoriteRepository.getByUserId(req.user.id, character.id);
        res.locals.data = { ...character, favorite: !!exists };
      } else {
        const { statusText } = response;
        res.locals.data = statusText;
      }
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
