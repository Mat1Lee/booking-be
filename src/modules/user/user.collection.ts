import { Schema, model, Types } from "mongoose";

const UserSchema = new Schema({
    branchId: Number,
    username: String,
    password: String,
    isActive: { default: true, type: Boolean },
    isSuperAdmin: { type: Boolean, default: false },
    createbyId: Types.ObjectId,
}, {
    timestamps: true,
});

const UserCollection = model('user', UserSchema, 'user');

export default UserCollection;