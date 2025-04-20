import mongoose from 'mongoose';

const mockUserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },        // e.g., user_1024
  username: { type: String, required: true },
  avatarIndex: { type: Number, default: 0 },
  favoriteResorts: [String],                                 // e.g., ["Vail", "Keystone"]
  friends: [String],                                         // userId strings
  sharedSessions: [String],                                  // sessionId strings
  notes: { type: String, default: '' }                       // Activity or profile blurbs
}, {
  timestamps: true
});

const MockUser = mongoose.model('MockUser', mockUserSchema);
export default MockUser;

