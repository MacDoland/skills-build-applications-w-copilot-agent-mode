import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { Activity } from './models/activity.js';
import { LeaderboardEntry } from './models/leaderboardEntry.js';
import { Team } from './models/team.js';
import { User } from './models/user.js';
import { Workout } from './models/workout.js';

const app = express();
const port = 8000;
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use(cors());

app.get('/api/health', (_request, response) => {
  response.json({ apiUrl: baseUrl, status: 'ok' });
});

app.get('/api/users/', async (_request, response) => {
  const users = await User.find().sort({ name: 1 }).lean();
  response.json({ data: users, resource: 'users' });
});

app.get('/api/teams/', async (_request, response) => {
  const teams = await Team.find().sort({ name: 1 }).lean();
  response.json({ data: teams, resource: 'teams' });
});

app.get('/api/activities/', async (_request, response) => {
  const activities = await Activity.find().sort({ date: -1 }).lean();
  response.json({ data: activities, resource: 'activities' });
});

app.get('/api/leaderboard/', async (_request, response) => {
  const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).lean();
  response.json({ data: leaderboard, resource: 'leaderboard' });
});

app.get('/api/workouts/', async (_request, response) => {
  const workouts = await Workout.find().sort({ focus: 1, title: 1 }).lean();
  response.json({ data: workouts, resource: 'workouts' });
});

async function start() {
  await mongoose.connect(mongoUri);
  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`);
  });
}

start().catch((error: unknown) => {
  console.error('Unable to start OctoFit API', error);
  process.exit(1);
});