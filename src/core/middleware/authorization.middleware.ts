/* eslint-disable max-len */
import loggerHelper from '@utils/logger.util';
import express from 'express';
import { find, get, map, reduce } from 'lodash';
// import jsonwebtoken from 'jsonwebtoken';
// import authService from '@modules/auth/auth.service';
import jwtUtil from '../../utils/jwt.util';
import { ForbiddenError, UnauthorizedError } from '../types/ErrorTypes';
import casbin from '../casbin';
import { ROOT_COMPANY_ID } from '../constant';
import UserCollection from '../../modules/user/user.collection';
import userService from '../../modules/user/user.service';

const logger = loggerHelper.getLogger('middleware.authorization');

const authorizationMiddleware = (rules: Array<[string, string]>) => async (req: express.Request,
  res: express.Response,
  next: express.NextFunction) => {
  const token: string = get(req, 'headers.authorization','') as string;
  const companyId: string = get(req, 'headers.companyid','') as string;
  try {
      const jwtToken = token ? token.split(' ')[1] : '';
  
      const user: any = jwtUtil.verifyToken(jwtToken);
  
      if (!user) {
        throw new UnauthorizedError();
      }
  
      const isEnforced = await Promise.all(map(rules, rule => {
        return casbin.enforcer.enforce(get(user, 'id'), companyId, rule[0], rule[1]);
      }));
      const isSuperAdmin = await userService.isSuperAdmin(user.id);
      const isPermitted = find(isEnforced, (val) => val == true);
      const check = await UserCollection.findById(get(user, 'id'));

      if (!isPermitted && !!!get(check,'isSuperAdmin')) {
        throw new ForbiddenError();
      }
      req.companyId = Number(companyId);
  
      req.isRoot = Number(companyId) === ROOT_COMPANY_ID;
      req.token = token;
      req.user = {
        id: get(user, 'id'),
        sessionId: get(user, 'sessionId'),
        branchId: get(user, 'branchId'),
      };
    next();
  } catch (error) {
    logger.error('authorizationMiddleware ERROR', error);
    next(error);
  }
};

export default authorizationMiddleware;
