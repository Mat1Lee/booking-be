import middleware from "@app/core/middleware";
import { Application } from "express";
import userController from "./user.controller";
const userRouter = (app: Application) => {
    app.post('/api/v1/user/validate-user', middleware.authenticate,userController.validUserAction)
    // app.post('/api/v1/user', middleware.authorization([
    //     [CORE_RESOURCES.user, CORE_ACTIONS.write],
    // ]), userController.createUserAction);
};
export default userRouter;