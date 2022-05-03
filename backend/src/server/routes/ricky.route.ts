import { Router } from 'express';
import { RickyController } from 'server/controllers';
import { authenticate } from 'server/middlewares';

const rickyRouter = Router();

rickyRouter.get('/', authenticate, RickyController.getAll);

rickyRouter.get('/:id', authenticate, RickyController.get);

export default rickyRouter;
