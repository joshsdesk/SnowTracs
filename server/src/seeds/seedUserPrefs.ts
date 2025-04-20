import mongoose from 'mongoose';
import dotenv from 'dotenv';
import db from '../config/connection';
import UserPrefs from '../models/UserPrefs';
import prefs from '../data/mockUserPrefs.json';

dotenv.config();

const seedUserPrefs = async () => {
  try {
    await db.once('open', async () => {
      console.log('🔌 Connected to MongoDB');

      // Clear existing preferences for this user
      await UserPrefs.deleteMany({ username: prefs.username });
      console.log(`🧹 Cleared prefs for ${prefs.username}`);

      // Insert the new mock user prefs
      await UserPrefs.create(prefs);
      console.log(`✅ Inserted mock prefs for ${prefs.username}`);

      process.exit(0);
    });
  } catch (err) {
    console.error('❌ Error seeding user preferences:', err);
    process.exit(1);
  }
};

seedUserPrefs();
