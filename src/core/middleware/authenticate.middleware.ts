import loggerHelper from '@utils/logger.util';
import jwtUtil from '@app/utils/jwt.util';
import express from 'express';
import { get } from 'lodash';
import { UnauthorizedError } from '../types/ErrorTypes';
import { ROOT_COMPANY_ID } from '../constant';
// import branchService from '@app/modules/branch/branch.service';

const logger = loggerHelper.getLogger('middleware.authenticate');

const authenticateMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const token: string = get(req, 'headers.authorization','');
  const companyId: string = String(get(req, 'headers.companyid',''));
  // const client: string = get(req, 'headers.client', '') || '';
  try {
      const jwtToken = token ? token.split(' ')[1] : '';
      const user: any = jwtUtil.verifyToken(jwtToken);
  
      if (!user) {
        throw new UnauthorizedError();
      }
      // const sessionKey = `userId:${user.id}:session:${user.sessionId}`;
      req.isRoot =  Number(companyId)===Number(ROOT_COMPANY_ID);
      req.user = user;
      req.companyId = Number(companyId);
    next();
  } catch (error) {
    logger.error('authenticateMiddleware ERROR', error);
    next(error);
  }
};

export default authenticateMiddleware;
