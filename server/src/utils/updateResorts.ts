import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import Resort from '../models/Resort';

dotenv.config();

async function updateResorts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('✅ Connected to MongoDB');

    const resorts = await Resort.find();
    if (!resorts.length) {
      console.log('⚠️ No resorts found in the database.');
      process.exit(0);
    }

    for (const resort of resorts) {
      const { latitude, longitude } = resort;
      if (latitude == null || longitude == null) {
        console.log(`⚠️ Skipping ${resort.name}: missing lat/lng`);
        continue;
      }

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&snowfall=true&snow_depth=true&timezone=auto`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        const snowDepth = data?.current?.snow_depth ?? 0;

        resort.snowpack_in = Math.round(snowDepth);
        await resort.save();

        console.log(`✅ Updated ${resort.name}: snowpack_in = ${resort.snowpack_in}"`);
      } catch (apiError) {
        console.error(`❌ API error for ${resort.name}:`, apiError);
      }
    }

    console.log('✅ Resort updates complete.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Update failed:', err);
    process.exit(1);
  }
}

updateResorts();
