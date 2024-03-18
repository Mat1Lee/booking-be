import { NotFoundError, ValidationFailedError } from "@app/core/types/ErrorTypes";
import express from "express";
import { NAME_AUTH } from './constants';
import loggerHelper from "@app/utils/logger.util";
import authService from "./auth.service";
import userService from "../user/user.service";
import { compact, forIn, forOwn, get, groupBy, uniq } from "lodash";
import casbin from "@app/core/casbin";
import { UserModalBase } from "../user/user.modal";
import { setResponse } from "@app/utils/response.util";
const logger = loggerHelper.getLogger('auth.controller');

const staffLoginAction = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {
            login, password
        } = req.body;

        if (!login || !password) {
            throw new ValidationFailedError(NAME_AUTH.please_enter_username_and_password);
        }
        const auth = await authService.staffLogin(login, password);
        res.send(auth);
    } catch (e) {
        logger.error('staffLoginAction', e);
        next(e);
    }
};


const fetchPolicyAction = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const userId = get(req.user, 'id');
        const user: UserModalBase = await userService.findUserById(userId);
        const companyId = get(user, 'branchId');
        if (!user || !companyId) {
            return {};
        }
        const policies = await casbin.enforcer.getImplicitResourcesForUser(userId);
        const formattedPolicies = policies.filter(([,policy]: any[]) => policy === String(companyId)).map(([,, ...res]: any[]) => res);
        const groups = groupBy(formattedPolicies,([resource])=>resource);
        forOwn(groups,(value,key,object)=>{
            object[key] = uniq(value.map(([,action])=>action))
        });

        res.send(groups)
    } catch (e) {
        logger.error('fetchPolicyAction', e);
        next(e);
    }
};

const fetchUserGroupAction = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        let entityId = get(req.query, 'branchId') || req.companyId;

        if (!req.isRoot) {
            entityId = req.companyId;
        }

        const role = await authService.getRolesByCompany(String(entityId));
        res.send(role);
    } catch (e) {
        logger.error('createUserGroupAction', e);
        next(e);
    }
};

const createUserGroupAction = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const { name, description, branchId } = req.body;
        let entityId = branchId || req.companyId;
        if (!req.isRoot) {
            entityId = req.companyId;
        }

        const role = await authService.createRole(entityId, name, description);
        res.send(role);
    } catch (e) {
        logger.error('createUserGroupAction', e);
        next(e);
    }
};

const updateUserGroupAction = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        let entityId: any = req.companyId;
        const { groupId } = req.params;
        const { name, description } = req.body;

        if (req.isRoot) {
            entityId = null;
        }
        const role = await authService.findOneRole(groupId, entityId);
        if (!role) {
            throw new NotFoundError()
        }

        const newRole = await authService.updateRole(groupId, name, description);
        res.send(setResponse(newRole, true));
    } catch (e) {
        logger.error('updateUserGroupAction', e);
        next(e);
    }
};

const deleteUserGroupAction = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        let entityId: any = req.companyId;
        const { groupId } = req.params;

        if (req.isRoot) {
            entityId = null;
        }
        const role = await authService.findOneRole(groupId, entityId);
        if (!role) {
            throw new NotFoundError()
        }

        await authService.removeRole(groupId);
        res.send(setResponse(null, true));
    } catch (e) {
        logger.error('updateUserGroupAction', e);
        next(e);
    }
};

const getUserGroupDetailAction = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        let branchId = get(req.query, 'branchId')
        const groupId = get(req.params, 'groupId');
        const role: any = await authService.getRolesDetailByCompanyAndId(groupId, branchId);
        res.send(role);
    } catch (e) {
        logger.error('getUserGroupDetailAction', e);
        next(e);
    }
}

const assignPermissionToRoleAction = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const {
            action,
            resource,
        } = req.body;

        const roleId = get(req.params, 'groupId');
        const role = await authService.findOneRole(roleId);

        if (!role) {
            throw new ValidationFailedError(NAME_AUTH.user_group_not_found);
        }

        const { actions, resources } = await authService.getResourcesForBranch(get(role, 'branchId'));
        if (!resources[resource]) {
            throw new ValidationFailedError(NAME_AUTH.data_is_not_allowed_to_be_updated);
        }

        if (!actions[action]) {
            throw new ValidationFailedError(NAME_AUTH.data_is_not_allowed_to_be_updated);
        }

        if (action === 'admin') {
             await casbin.enforcer.removeFilteredPolicy( 0, ...[roleId, String(get(role, 'branchId')), resource]);
             const rules :string [][] = ['admin', 'read', 'update', 'write', 'delete','download']
                    .map((action: string) => [roleId, String(get(role, 'branchId')), resource, action]);
             for (const act in rules) {
                await casbin.enforcer.addPolicy(...rules[act]);
              }
        } else {
            // If not an admin, add only the requested policy
            await casbin.enforcer.addPolicy(...[roleId, String(get(role, 'branchId')), resource, action]);
        }

        await casbin.enforcer.loadPolicy();
        return res.send(true);
    } catch (e) {
        logger.error('assignPermissionToRoleAction', e);
        next(e);
    }
};

const removePermissionToRoleAction = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const {
            action,
            resource,
        } = req.body;
        const branchId: any = req.isRoot ? null : req.companyId;
        const roleId = get(req.params, 'groupId');
        const role = await authService.findOneRole(roleId, branchId);
        if (!role) {
            throw new ValidationFailedError(NAME_AUTH.user_group_not_found);
        }

        if (action === 'admin') {
            await casbin.enforcer.removeFilteredPolicy( 0, ...[roleId, String(get(role, 'branchId')), resource]);
        } else {
            // If not an admin, add only the requested policy
            await casbin.enforcer.removePolicy(...[roleId, String(get(role, 'branchId')), resource, action]);
        }
        await casbin.enforcer.loadPolicy();
        return res.send(true);
    } catch (e) {
        logger.error('removePermissionToRoleAction', e);
        next(e);
    }
};
const getResourcePermissionAction = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      let entityId = get(req.query, 'branchId') || req.companyId;
      if(!req.isRoot) {
        entityId = req.companyId;
      }
      const resources = await authService.getTranslatedResourcesAndActionsForBranch(Number(entityId));
      res.send(resources);
    } catch (e) {
      logger.error('getResourcePermissionAction', e);
      next(e);
    }
  };

export default {
    staffLoginAction,
    fetchPolicyAction,
    getUserGroupDetailAction,
    fetchUserGroupAction,
    createUserGroupAction,
    updateUserGroupAction,
    deleteUserGroupAction,
    assignPermissionToRoleAction,
    removePermissionToRoleAction,
    getResourcePermissionAction
}