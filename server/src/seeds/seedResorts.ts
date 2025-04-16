import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Resort from '../models/Resort';
import resortsData from '../data/colorado_resorts.json'; // Adjust the path as necessary

dotenv.config();

async function seedResorts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('✅ Connected to MongoDB');

    await Resort.deleteMany();
    console.log('🧹 Cleared old resorts');

    await Resort.insertMany(resortsData);
    console.log('🌄 Resort data seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seedResorts();
