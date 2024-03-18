import { Application } from "express";
import authController from "./auth.controller";
import middleware from "@app/core/middleware";
import { CORE_ACTIONS, CORE_RESOURCES } from "@app/core/permissions";
const authRouter = (app: Application) => {
    // #login
    app.post('/api/v1/staff-login', authController.staffLoginAction);
    app.get('/api/v1/user-policy', middleware.authenticate, authController.fetchPolicyAction);

    app.get('/api/v1/resource-permission',
        middleware.authorization([
          [CORE_RESOURCES.userGroup, CORE_ACTIONS.read],
        ]),
        authController.getResourcePermissionAction);
    //#role-action
    app.put('/api/v1/user-group/:groupId/permission', 
        middleware.authorization([
            [CORE_RESOURCES.userGroup, CORE_ACTIONS.update],
        ]), authController.assignPermissionToRoleAction);
    app.delete('/api/v1/user-group/:groupId/permission', 
        middleware.authorization([
            [CORE_RESOURCES.userGroup, CORE_ACTIONS.update],
        ]),authController.removePermissionToRoleAction);

    app.get('/api/v1/user-group/:groupId',

        middleware.authorization([
            [CORE_RESOURCES.userGroup, CORE_ACTIONS.read],
        ]),
        authController.getUserGroupDetailAction);

    //#userGroup 
    app.get('/api/v1/user-group',

        middleware.authorization([
            [CORE_RESOURCES.userGroup, CORE_ACTIONS.read],
        ]),
        authController.fetchUserGroupAction);

    app.post('/api/v1/user-group',

        middleware.authorization([
            [CORE_RESOURCES.userGroup, CORE_ACTIONS.write],
        ]),
        authController.createUserGroupAction);

    app.put('/api/v1/user-group/:groupId',
        middleware.authorization([
            [CORE_RESOURCES.userGroup, CORE_ACTIONS.update],
        ]),
        authController.updateUserGroupAction);

    app.delete('/api/v1/user-group/:groupId',
        middleware.authorization([
            [CORE_RESOURCES.userGroup, CORE_ACTIONS.delete],
        ]),
        authController.deleteUserGroupAction);
};
export default authRouter;