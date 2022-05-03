import { UserService } from 'server/services';
import { Unauthorized } from 'server/utils/errors';
import { Request, Response, NextFunction } from 'express';

export default class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email: username, password } = req.body;
      UserService.verifyPassword(username, password)
        .then((user) => {
          const { id, email, favorites } = user;
          res.locals.data = { id, email, favorites };
          return next();
        })
        .catch(() => {
          throw new Unauthorized('Wrong password');
        });
    } catch (error) {
      return next(error);
    }
  }
}
