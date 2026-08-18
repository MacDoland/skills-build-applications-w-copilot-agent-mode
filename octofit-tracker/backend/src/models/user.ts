import { Schema, model } from 'mongoose';

export interface UserDocument {
  email: string;
  name: string;
  role: 'athlete' | 'coach';
  teamName: string;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['athlete', 'coach'], required: true },
    teamName: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = model<UserDocument>('User', userSchema);