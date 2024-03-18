import loggerHelper from "@app/utils/logger.util";
import { NextFunction, Request, Response } from "express";
import userService from "./user.service";

const logger = loggerHelper.getLogger('user.controller');

const validUserAction = async(req: Request, res: Response, next: NextFunction)=>{
    try {
      const {
        fullName,
      } = req.body;
      const valid = await userService.validUser(fullName)
      return res.send({username:valid})
    } catch (e) {
      logger.error('fetchUserAction', e);
      next(e);
    }
  }

export default {
    validUserAction
}