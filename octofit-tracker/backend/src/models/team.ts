import { Schema, model } from 'mongoose';

export interface TeamDocument {
  coach: string;
  memberCount: number;
  name: string;
  region: string;
}

const teamSchema = new Schema<TeamDocument>(
  {
    coach: { type: String, required: true },
    memberCount: { type: Number, required: true, min: 1 },
    name: { type: String, required: true, unique: true },
    region: { type: String, required: true },
  },
  { timestamps: true },
);

export const Team = model<TeamDocument>('Team', teamSchema);