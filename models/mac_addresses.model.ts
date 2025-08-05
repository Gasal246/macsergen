import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IMac_addresses extends Document {
  module_id: ObjectId | null;
  mac_address: String | null;
  used: Boolean | null;
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const Mac_addressesSchema: Schema = new Schema({
  module_id: { type: Schema.Types.ObjectId, ref: 'modules' },
  mac_address: { type: String },
  used: { type: Boolean, default: false },
}, { timestamps: true });

const Mac_addresses = mongoose.models?.mac_addresses || mongoose.model<IMac_addresses>('mac_addresses', Mac_addressesSchema);

export default Mac_addresses;
