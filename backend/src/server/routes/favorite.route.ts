import { Router } from 'express';
import { validate } from 'express-validation';
import { FavoriteController } from 'server/controllers';
import { authenticate } from 'server/middlewares';
import { favoriteValidation, options } from 'server/validations';

const favoriteRouter = Router();

favoriteRouter.post(
  '/',
  authenticate,
  validate(favoriteValidation.create, options),
  FavoriteController.create,
);

favoriteRouter.delete(
  '/',
  authenticate,
  validate(favoriteValidation.destroy, options),
  FavoriteController.destroy,
);

export default favoriteRouter;
