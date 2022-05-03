import { UNAUTHORIZED } from 'http-status';
import errors from 'server/utils/constants/errors';
import { Request, Response, NextFunction } from 'express';
import { createErrorResponse } from 'server/utils/functions';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res
      .status(UNAUTHORIZED)
      .json(
        createErrorResponse(UNAUTHORIZED, errors.not_authorized, undefined, '401 - Unauthorized'),
      );
  }
};

export default authenticate;
