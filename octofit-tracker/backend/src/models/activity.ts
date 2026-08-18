import { Schema, model } from 'mongoose';

export interface ActivityDocument {
  caloriesBurned: number;
  date: Date;
  durationMinutes: number;
  type: 'cycling' | 'running' | 'strength' | 'yoga';
  userEmail: string;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    caloriesBurned: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    type: { type: String, enum: ['cycling', 'running', 'strength', 'yoga'], required: true },
    userEmail: { type: String, required: true },
  },
  { timestamps: true },
);

export const Activity = model<ActivityDocument>('Activity', activitySchema);