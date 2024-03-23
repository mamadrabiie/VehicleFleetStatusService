import mongoose, { Date, now } from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  phoneNumber: { type: String, require: true, unique: true },
  registerTime: { type: String, default: now },
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car', default: [] }],
  drivers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Drive', default: [] }],
});

export interface User extends mongoose.Document {
  username: string;
  phoneNumber: string;
  registerTime: Date;
  cars: string[];
  drivers: string[];
}
