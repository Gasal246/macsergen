import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IModules extends Document {
    _id: ObjectId;
    model_number: String | null;
    description: String | null;
    suffix: String | null;
    qty: Number | null;
    chipset: String | null;
    ap_type: String | null;
    createdAt: Date;
    updatedAt: Date;
}

const ModulesSchema: Schema = new Schema({
    model_number: { type: String },
    description: { type: String },
    suffix: { type: String },
    qty: { type: Number },
    chipset: { type: String },
    ap_type: { type: String }
}, { timestamps: true });

const Modules = mongoose?.models?.modules || mongoose.model<IModules>('modules', ModulesSchema);

export default Modules;
