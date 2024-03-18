import loggerHelper  from '@utils/logger.util';
import express from 'express';
import { UnauthorizedError } from '../types/ErrorTypes';
import { get } from 'lodash';
import bcryptUtil from '@app/utils/bcrypt.util';

const logger = loggerHelper.getLogger('middleware.authenticate');
const validApiKey =async(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
)=>{

  const APIKEY : string = String(get(req,['headers','apikey'],'' ))
  try {
      const generateApikey = await bcryptUtil.generateHashapikey(APIKEY)
      // const checkBranch = await branchService.findBranchApiKey(generateApikey)
      // if(!checkBranch){
      //   throw new UnauthorizedError()
      // }
      // req.companyId = checkBranch._id
      // req.user = { partnerId : checkBranch.partnerId}

      next()
    } catch (error) {
      logger.error('validAPIKeyMiddleware ERROR', error);
      next(error);
  }
}
export default validApiKey