import crypto from 'crypto';
import { CREATED } from 'http-status';
import { UserService } from 'server/services';
import { Request, Response, NextFunction } from 'express';

export default class UserController {
  static async runServiceAction(req: Request, serviceAction: Function) {
    const id = req.user ? req.user.id : undefined;
    const { email, password, salt } = req.body;
    if (id) {
      return serviceAction({
        id,
        salt,
        email,
        password,
      });
    }
    return serviceAction({
      salt,
      email,
      password,
    });
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const salt = crypto.randomBytes(32).toString('hex');
      crypto.pbkdf2(req.body.password, salt, 310000, 64, 'sha512', async (err, hashed) => {
        if (err) {
          return next(err);
        }
        req.body.salt = salt;
        req.body.password = hashed.toString('hex');
        const newUser = await UserController.runServiceAction(req, UserService.create);
        res.locals.status = CREATED;
        res.locals.data = newUser;
        return next();
      });
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const userDelete = await UserController.runServiceAction(req, UserService.destroy);
      res.locals.data = userDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
