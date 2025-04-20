import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserPrefs from '../models/UserPrefs';
import baseUsers from '../data/mockUsers.json';
import userPrefs from '../data/mockUserPrefs.json';
import db from '../config/connection';

dotenv.config();

const seedUsers = async () => {
  try {
    await db.once('open', async () => {
      console.log('🔌 MongoDB connected for user prefs seeding.');

      await UserPrefs.deleteMany({});
      console.log('🧹 Cleared existing user preference data.');

      const combined = baseUsers.map((baseUser) => {
        const match = userPrefs.find((pref) => pref.userId === baseUser.id);

        return {
          userId: baseUser.id,
          username: baseUser.username,
          avatarIndex: baseUser.avatarIndex,
          favoriteResorts: baseUser.favoriteResorts,
          friends: baseUser.friends,
          sharedSessions: baseUser.sharedSessions,
          notes: baseUser.notes,
          theme: match?.theme || 'dark',
          units: match?.units || 'imperial',
          notifications: match?.notifications ?? true,
          showStatsOnHome: match?.showStatsOnHome ?? true,
          highContrastMode: match?.highContrastMode ?? false
        };
      });

      await UserPrefs.insertMany(combined);
      console.log('✅ Mock user and preference data inserted successfully.');

      process.exit(0);
    });
  } catch (err) {
    console.error('❌ UserPrefs seeding error:', err);
    process.exit(1);
  }
};

seedUsers();
