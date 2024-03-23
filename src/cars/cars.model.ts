import * as mongoose from 'mongoose';
import { Insurance, InsuranceSchema } from './insurance.model';

export const CarSchema = new mongoose.Schema({
  color: { type: String },
  numberPlate: { type: String },
  engineNumber: { type: String },
  bodyNumber: { type: String },
  brand: { type: String },
  model: { type: String },
  Km: { type: Number, default: 0 },
  insurance: { type: InsuranceSchema },
  userId: { type: String, ref: 'User' },
  driverId: { type: String, ref: 'Driver' },
  keyImCar: { type: String },
});

export interface CarInterface {
  color: string;
  numberPlate: string;
  engineNumber: string;
  bodyNumber: string;
  brand: string;
  model: string;
  Km: number;
  insurance: Insurance;
  userId: string;
  driverId: string;
  keyImCar: string;
}
