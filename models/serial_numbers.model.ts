import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface ISerial_numbers extends Document {
  module_id: ObjectId | null;
  serial_number: String | null;
  used: Boolean | null;
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const Serial_numbersSchema: Schema = new Schema({
  module_id: { type: Schema.Types.ObjectId, ref: 'modules' },
  serial_number: { type: String },
  used: { type: Boolean, default: false },
}, { timestamps: true });

const Serial_numbers = mongoose.models?.serial_numbers || mongoose.model<ISerial_numbers>('serial_numbers', Serial_numbersSchema);

export default Serial_numbers;

