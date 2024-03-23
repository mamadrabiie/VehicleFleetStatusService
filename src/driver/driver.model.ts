import * as mongoose from 'mongoose';

export const DriverSchema = new mongoose.Schema({
  phoneNumber: { type: String },
  name: { type: String },
  lisenseNumber: { type: String },
  userId: { type: String, ref: 'User' },
  carId: { type: String, ref: 'Car' },
  keyImDrive: { type: String },
});

export interface Driver {
  phoneNumber: string;
  name: string;
  lisenseNumber: string;
  userId: string;
  carId: string;
  keyImDrive: string;
}
