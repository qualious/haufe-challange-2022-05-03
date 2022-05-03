import { CREATED } from 'http-status';
import { FavoriteService } from 'server/services';
import { Request, Response, NextFunction } from 'express';

export default class FavoriteController {
  static async runServiceAction(req: Request, serviceAction: Function) {
    const { user } = req;
    const { characterId } = req.body;

    return serviceAction({
      user,
      characterId,
    });
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newFavorite = await FavoriteController.runServiceAction(req, FavoriteService.create);
      res.locals.status = CREATED;
      res.locals.data = newFavorite;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const favoriteDelete = await FavoriteController.runServiceAction(
        req,
        FavoriteService.destroy,
      );
      res.locals.data = favoriteDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
