import { UnAuthenticated, UnauthorizedError } from "@app/core/types/ErrorTypes";
import bcryptUtil from "@app/utils/bcrypt.util";
import jwtUtil from "@app/utils/jwt.util";
import { filter, get } from "lodash";
import { v4 } from "uuid";
import UserCollection from "../user/user.collection";
import { NAME_AUTH, PHARMACY_DEFAULT_ROLES } from "./constants";
// import AdapaterUserCollection from "../adapaterUser/adapaterUser.collection";
import { TypeObjectId } from "@app/utils/app.util";
import { UserDocument, UserModalBase } from "../user/user.modal";
// import casbin from "@app/core/casbin";
import makeQuery from "@app/core/database/query";
import RoleCollection from "./role.collection";
import { ROOT_COMPANY_ID } from "@app/core/constant";
import { CORE_ACTIONS, ROOT_ACTIONS, CORE_RESOURCES, ROOT_RESOURCES, RESOURCES, ACTIONS } from "@app/core/permissions";

// Auth service
const staffLogin = async (login: string, password: string) => {
    const sessionId = v4();
    const query: UserModalBase = {
        deletedAt: null,
        isActive: true,
        username: login
    };
    const user: UserModalBase = await UserCollection.findOne(query).lean().exec();

    if (!user) {
        throw new UnAuthenticated(NAME_AUTH.this_account_does_not_exist);
    }
    const isPasswordMatched = await bcryptUtil.comparePassword(password, get(user, 'password', ''));
    if (!isPasswordMatched) {
        throw new UnAuthenticated();
    }

    // const adapater = await AdapaterUserCollection.findOne({ userId: TypeObjectId(user._id) }).select('groups role').lean().exec();
    // const groups = get(adapater, 'groups', []);
    // if ((!groups || groups.length < 1) && !user.isSuperAdmin) {
    //     throw new UnauthorizedError('Bạn không có quyền truy cập vào trang này.');
    // }

    const token = jwtUtil.issueToken(String(get(user, '_id')), String(get(user, 'branchId', '')), sessionId);

    return {
        userId: get(user, '_id'),
        sessionId,
        token,
        // adapater: get(adapater, 'role'),
        branchId: get(user, 'branchId', ''),
    }
}

const getResourcesForBranch = async (branchId: number) => {
    // const branch = await branchService.findBranchById(branchId);

    let resources: any = {};

    const actions: any = branchId == ROOT_COMPANY_ID ? ROOT_ACTIONS : CORE_ACTIONS;
    resources = {
        ...CORE_RESOURCES,
        ...ROOT_RESOURCES
    };
    return {
        resources,
        actions,
    };
}

const getRolesDetailByCompanyAndId = async (roleId: string, branchId?: any) => {
    const query: any = {
        _id: TypeObjectId(roleId)
    };
    if (branchId) {
        query.branchId = Number(branchId);
    }
    const role = await makeQuery(RoleCollection.findOne(query).lean().exec());
    // const policies = await casbin.enforcer.getFilteredPolicy(0, roleId, String(get(role, 'branchId')));
    // // // const formattedPolicies = policies.filter(policy => policy[1] === String(get(role, 'branchId'))).map((policy) => {
        // return policy.slice(2);
    // });
    const groupedPolicies: any = {};
    // formattedPolicies.forEach((policy) => {
        // // groupedPolicies[get(policy, '0')] = groupedPolicies[get(policy, '0')] || []
        // // groupedPolicies[get(policy, '0')].push(get(policy, '1'));
    // });
    return {
        ...role,
        policies: groupedPolicies,
    };
}


const getRolesByCompany = async (branchId: string) => {
    return makeQuery(RoleCollection.find({ branchId }).lean().exec());
}

const findOneRole = async (roleId: string, branchId?: number) => {
    const query: any = {
        _id: TypeObjectId(roleId),
    }
    if (branchId) {
        query.branchId = Number(branchId);
    }
    return makeQuery(RoleCollection.findOne(query).lean().exec());
}


// const assignUserToGroup = async (userId: string, roles: string[], domain: string) => {
//     await Promise.all(roles.map((role) => casbin.enforcer.addRoleForUser(userId, role, domain)));
//     // return casbin.enforcer.loadPolicy();
// }

// const removeRoleForUser = async (userId: string, domain: string) => {
//     return casbin.enforcer.deleteRolesForUser(userId, domain);
// }

const createRole = async (branchId: string, roleName: string, description: string) => {
    return makeQuery(RoleCollection.create({
        name: roleName,
        branchId,
        description,
    }));
}

const updateRole = async (roleId: string, name: string, description: string) => {
    const query: any = {
        _id: TypeObjectId(roleId),
    };
    return makeQuery(RoleCollection.findOneAndUpdate(query, { $set: { name, description } }, { new: true }).exec());
}

const removeRole = async (roleId: string) => {
    await makeQuery(RoleCollection.findByIdAndDelete(roleId).exec());
    // await casbin.enforcer.deleteRole(roleId);
}

// const updateUserGroups = async (userId: string, groups: string[]=[], branchId: string) => {
//     await removeRoleForUser(userId, branchId);
//     return assignUserToGroup(userId, groups, branchId);
// }

const getTranslatedResourcesAndActionsForBranch = async (branchId: number) => {
    const { resources, actions } = await getResourcesForBranch(branchId);
    const resourceKeys = Object.keys(resources);
    const actionKeys = Object.keys(actions);
    const translatedResource = filter(RESOURCES, (resource: any) => resourceKeys.includes(resource.key));
    const translatedAction = filter(ACTIONS, (action: any) => actionKeys.includes(action.key));

    return {
        resources: translatedResource,
        actions: translatedAction,
    };
}
const assignParentBranch = async (childBranchId: number, parentBranchId: number) => {
    // return casbin.enforcer.addNamedGroupingPolicy('g2', String(childBranchId), String(parentBranchId));
}

const setupDefaultRoles = async (branchId: string, modules: string[]) => {
    let roles: any = PHARMACY_DEFAULT_ROLES
    await Promise.all(roles.map(async (role: { name: any; permissions: any; }) => {
      const { name, permissions, } = role;
      const createdRole = await RoleCollection.create({
        name,
        branchId,
      });
      await Promise.all(permissions.map(async (per: { resource: any; action: any; }) => {
        const { resource, action } = per;
        const policies = action.map((act: any) => ([get(createdRole, '_id'), branchId, resource, act]))
        // return Promise.all(policies.map((pol: any) => casbin.enforcer.addPolicy(...pol)));
      }))
    //   await casbin.enforcer.loadPolicy();
  
      return Promise.resolve();
  
    }));
    return Promise.resolve();
  }
  
export default {
    staffLogin,
    // assignUserToGroup,
    // removeRoleForUser,
    createRole,
    updateRole,
    removeRole,
    getResourcesForBranch,
    getRolesDetailByCompanyAndId,
    getRolesByCompany,
    findOneRole,
    // updateUserGroups,
    getTranslatedResourcesAndActionsForBranch,
    assignParentBranch,
    setupDefaultRoles,
}