import makeQuery from "@app/core/database/query";
import UserCollection from "./user.collection";
import { UserDocument, UserModalBase } from "./user.modal";
import { get, pick, trim } from "lodash";
import bcryptUtil from "@app/utils/bcrypt.util";
import slugify from "slugify";
// import AdapaterUserCollection from '../adapaterUser/adapaterUser.collection';
import { TypeObjectId } from "@app/utils/app.util";
import {Types} from "mongoose";


const createUser = async (profile: any) => {
  let user: UserModalBase = pick(profile, ['username', 'password', 'branchId', 'createbyId']);
  user.password = await bcryptUtil.generateHash(user.password);
  return await UserCollection.create(user);
}
const updateUser =async (profile: {userId:string,password:string,username:string,status?:boolean}) => {
  let user = pick(profile, ['username', 'password', 'userId']);
  user.password = await bcryptUtil.generateHash(user.password);
  return await UserCollection.findByIdAndUpdate(user.userId, {$set:user}, { new: true });
}
const updateStatusUser =async (profile: {userId:string,status?:boolean}) => {
  let user = pick(profile, ['status', 'userId']);
  return await UserCollection.findByIdAndUpdate(user.userId, {$set:user}, { new: true });
}

const findUserById = async (userId: string) => {
  return makeQuery(UserCollection.findById(userId).exec());
}

const findUser = async (query: any) => {
  return makeQuery(UserCollection.find(query).exec());
}

const findStaffByUser = async (userId:any) => {
  // const user = await AdapaterUserCollection.findOne({userId : TypeObjectId(userId)}).select('-password').lean().exec();
  // return await AdapaterUserCollection.populate(user,[{path: 'profile'},{path: 'user',select:'username isSuperAdmin'}])
}

const generator = async function*(fullName:string){
  let arrame = String(fullName??'').split(' ');
  const firstName = arrame.pop()
  const newName = [
    slugify(firstName.toLocaleLowerCase()),
    ...arrame.map((name) => slugify(name).slice(0, 1).toLocaleLowerCase()),
  ].join('');
  let count = 0
  let breakPoint = true
    try{
      while(breakPoint){
        let name = newName + (!!count?String(count):'')
        const findUser = await UserCollection.count({username: name});
        breakPoint = Boolean(findUser)
        yield name
        count++
      }
    }finally {
      count--
    	return newName + (!!count?String(count):'');
  	}
}

const validUser = async(fullName: string,)=>{
  const value = generator(trim(fullName));
  const func = async() :Promise<string>=>{
    const vla = await value.next();
    if(!vla.done){
      return func()
    }else{
      return vla.value;
    }
  }
  return await func()
}
const isSuperAdmin = async (userId: string): Promise<boolean> => {
  const user = await UserCollection.findById(userId);
  if (user && user.isSuperAdmin) {
    return true;
  }
  return false;
};

const checkIsAdmin = async (userId:string) => {
  const user = await UserCollection.findById(userId).lean().exec();
  if(!!get(user,'isSuperAdmin')) return null;
  return userId;
}

const findSupperAdmin = async()=>{
  return await UserCollection.findOne({isSuperAdmin:true})
}

const getListUserByIds = async (ids:any[]) =>{
  // return await AdapaterUserCollection.find({userId:{$in:ids}}).populate({path:'profile',select:'fullName'}).lean().exec();
}
export default {
  findUserById,
  createUser,
  findUser,
  validUser,
  updateUser,
  findStaffByUser,
  isSuperAdmin,
  updateStatusUser,
  checkIsAdmin,
  findSupperAdmin,
  getListUserByIds,
}