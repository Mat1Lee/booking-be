import { Schema, model } from "mongoose";

const RoleSchema = new Schema({
    name: String,
    description: String,
    branchId: Number,
    deletedAt: Date,
}, {
    timestamps: true,
});

const RoleCollection = model('role', RoleSchema, 'role');

export default RoleCollection;