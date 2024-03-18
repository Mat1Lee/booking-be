import loggerHelper from '@utils/logger.util';
import jwtUtil from '@app/utils/jwt.util';
import express from 'express';
import { get } from 'lodash';
import { UnauthorizedError } from '../types/ErrorTypes';

const logger = loggerHelper.getLogger('jwt.authenticate');

const jwtMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const token: string = get(req, 'headers.authorization','') as string;
  const companyId: string = get(req, 'headers.companyid','') as string;
  try {
    let user: any = null;
    if(token) {
      const jwtToken = token ? token.split(' ')[1] : '';
      user = jwtUtil.verifyToken(jwtToken);
    }

    req.user = user;
    req.companyId = Number(companyId);
    next();
  } catch (error) {
    logger.error('jwtMiddleware ERROR', error);
    next(error);
  }
};

export default jwtMiddleware;
