import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // ✅ this must be here

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/snowtracs_db';

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('✅ Connected to MongoDB');
});

export default db;
