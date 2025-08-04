import { timeStamp } from 'console';
import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IModules extends Document {
    _id: ObjectId;
    module_name: String | null;
    macIds: String[];
    serialNumbers: String[];
    suffix: String | null;
    createdAt: Date;
    updatedAt: Date;
}

const ModulesSchema: Schema = new Schema({
    module_name: { type: String },
    macIds: { type: [String] },
    serialNumbers: { type: [String] },
    suffix: { type: String },
}, { timestamps: true });

const Modules = mongoose?.models?.modules || mongoose.model<IModules>('modules', ModulesSchema);

export default Modules;

