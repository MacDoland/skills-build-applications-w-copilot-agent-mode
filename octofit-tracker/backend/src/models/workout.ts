import { Schema, model } from 'mongoose';

export interface WorkoutDocument {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  focus: string;
  title: string;
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    focus: { type: String, required: true },
    title: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export const Workout = model<WorkoutDocument>('Workout', workoutSchema);