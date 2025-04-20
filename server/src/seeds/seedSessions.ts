import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Session from '../models/Session';
import oneRun from '../data/one-run.json';
import twoRun from '../data/two-run.json';
import fullDay from '../data/full-day.json';
import sosDay from '../data/sos-full-day.json';
import db from '../config/connection';

dotenv.config();

const seedData = [oneRun, twoRun, fullDay, sosDay];

const seedSessions = async () => {
  try {
    await db.once('open', async () => {
      console.log('🔌 MongoDB connected for session seeding.');

      await Session.deleteMany({});
      console.log('🧹 Old sessions cleared.');

      await Session.insertMany(seedData);
      console.log('✅ All session data inserted successfully.');

      process.exit(0);
    });
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedSessions();
