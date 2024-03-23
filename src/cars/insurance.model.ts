import * as mongoose from 'mongoose';

export const InsuranceSchema = new mongoose.Schema({
  start: { type: String, require: true },
  finish: { type: String, require: true },
  number: { type: String, require: true },
});

export interface Insurance {
  start: string;
  finish: string;
  number: string;
}
