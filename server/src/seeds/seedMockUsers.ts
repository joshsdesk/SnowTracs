import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MockUser from '../models/mockUsers';
import mockUsers from '../data/mockUsers.json';
import db from '../config/connection';

dotenv.config();

interface MockUserType {
  id: string;
  username: string;
  avatarIndex: number;
  favoriteResorts: string[];
  friends: string[];
  sharedSessions: string[];
  notes: string;
}

const seedMockUsers = async () => {
  try {
    await db.once('open', async () => {
      console.log('🔌 MongoDB connected for mock user seeding.');

      await MockUser.deleteMany({});
      console.log('🧹 Cleared existing mock users.');

      await MockUser.insertMany(mockUsers as MockUserType[]);
      console.log('✅ Mock users inserted successfully.');

      process.exit(0);
    });
  } catch (err) {
    console.error('❌ Mock user seeding error:', err);
    process.exit(1);
  }
};

seedMockUsers();
