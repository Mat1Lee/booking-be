// import casbin from '../casbin';
// import { find, map } from 'lodash';
// import userService from '@app/modules/user/user.service';

// const hasPermission = async (
//   rules: Array<[string, string]>,
//   userId: string,
//   companyId: any,
//   user?: any
// ) => {
//   const isEnforced = await Promise.all(
//     map(rules, (rule) => {
//       return casbin.enforcer.enforce(userId, companyId, rule[0], rule[1]);
//     })
//   );
//   const isSuperAdmin = user
//     ? user.isSuperAdmin
//     : await userService.isSuperAdmin(userId);
//   const isPermitted = find(isEnforced, (val) => val == true);
//   if (!isPermitted && !isSuperAdmin) {
//     return 0;
//   }
//   return 1;
// };

// export default hasPermission;
