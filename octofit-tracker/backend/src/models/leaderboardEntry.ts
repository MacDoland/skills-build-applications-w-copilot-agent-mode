import { Schema, model } from 'mongoose';

export interface LeaderboardEntryDocument {
  rank: number;
  score: number;
  teamName: string;
  userEmail: string;
  userName: string;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntryDocument>(
  {
    rank: { type: Number, required: true, min: 1 },
    score: { type: Number, required: true, min: 0 },
    teamName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
  },
  { timestamps: true },
);

export const LeaderboardEntry = model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardEntrySchema);