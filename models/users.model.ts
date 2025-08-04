import { timeStamp } from 'console';
import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IUsers extends Document {
    _id: ObjectId;
    name: String | null;
    email: String | null;
    password: String | null;
    createdAt: Date;
    updatedAt: Date;
}

const UsersSchema: Schema = new Schema({
    module_name: { type: String },
}, { timestamps: true });

const Users = mongoose?.models?.users || mongoose.model<IUsers>('users', UsersSchema);

export default Users;

