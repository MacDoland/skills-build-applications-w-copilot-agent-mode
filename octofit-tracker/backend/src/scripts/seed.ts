import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboardEntry.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri);

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  await Team.insertMany([
    { coach: 'Maya Chen', memberCount: 12, name: 'Trail Blazers', region: 'Pacific Northwest' },
    { coach: 'Jordan Patel', memberCount: 9, name: 'Metro Milers', region: 'Northeast' },
    { coach: 'Sam Rivera', memberCount: 15, name: 'Peak Performers', region: 'Rocky Mountains' },
  ]);

  await User.insertMany([
    { email: 'maya.chen@octofit.test', name: 'Maya Chen', role: 'coach', teamName: 'Trail Blazers' },
    { email: 'alex.morgan@octofit.test', name: 'Alex Morgan', role: 'athlete', teamName: 'Trail Blazers' },
    { email: 'jamie.okafor@octofit.test', name: 'Jamie Okafor', role: 'athlete', teamName: 'Metro Milers' },
    { email: 'taylor.nguyen@octofit.test', name: 'Taylor Nguyen', role: 'athlete', teamName: 'Peak Performers' },
  ]);

  await Activity.insertMany([
    {
      caloriesBurned: 620,
      date: new Date('2026-08-15T13:30:00.000Z'),
      durationMinutes: 52,
      type: 'running',
      userEmail: 'alex.morgan@octofit.test',
    },
    {
      caloriesBurned: 410,
      date: new Date('2026-08-16T18:00:00.000Z'),
      durationMinutes: 45,
      type: 'strength',
      userEmail: 'jamie.okafor@octofit.test',
    },
    {
      caloriesBurned: 540,
      date: new Date('2026-08-17T11:15:00.000Z'),
      durationMinutes: 60,
      type: 'cycling',
      userEmail: 'taylor.nguyen@octofit.test',
    },
  ]);

  await LeaderboardEntry.insertMany([
    { rank: 1, score: 9820, teamName: 'Peak Performers', userEmail: 'taylor.nguyen@octofit.test', userName: 'Taylor Nguyen' },
    { rank: 2, score: 9340, teamName: 'Trail Blazers', userEmail: 'alex.morgan@octofit.test', userName: 'Alex Morgan' },
    { rank: 3, score: 8875, teamName: 'Metro Milers', userEmail: 'jamie.okafor@octofit.test', userName: 'Jamie Okafor' },
  ]);

  await Workout.insertMany([
    { difficulty: 'beginner', durationMinutes: 25, focus: 'mobility', title: 'Morning Mobility Reset' },
    { difficulty: 'intermediate', durationMinutes: 40, focus: 'endurance', title: 'Tempo Run Builder' },
    { difficulty: 'advanced', durationMinutes: 55, focus: 'strength', title: 'Full-Body Power Circuit' },
  ]);

  console.log('Seeded users, teams, activities, leaderboard, and workouts collections.');
}

seed()
  .catch((error: unknown) => {
    console.error('Failed to seed octofit_db', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
