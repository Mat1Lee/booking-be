import { Document, Types } from "mongoose";
export interface UserModalBase {
    _id?:Types.ObjectId,
    branchId?: number,
    username: string,
    password?: string,
    isActive?: boolean,
    isSuperAdmin?: boolean,
    createbyId?: string,
    deletedAt?: Date|null,
    groups?:Types.ObjectId,
}
export interface UserDocument extends Omit<UserModalBase,'_id'>, Document {
    createby?: object
}