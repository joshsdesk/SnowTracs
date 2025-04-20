import mongoose from 'mongoose';

const userPrefsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // match against real user or mock ID
  username: { type: String, required: true },             // for frontend UI rendering
  avatarIndex: { type: Number, default: 0 },              // 0–8
  favoriteResorts: [String],                              // e.g., ["Vail", "Keystone"]
  friends: [String],                                      // userId references
  sharedSessions: [String],                               // sessionId references
  notes: { type: String, default: '' },                   // internal text / bio

  // Settings page prefs
  theme: { type: String, default: 'dark' },               // "dark" | "light"
  units: { type: String, default: 'imperial' },           // "imperial" | "metric"
  notifications: { type: Boolean, default: true },
  showStatsOnHome: { type: Boolean, default: true },
  highContrastMode: { type: Boolean, default: false }

}, {
  timestamps: true
});

const UserPrefs = mongoose.model('UserPrefs', userPrefsSchema);
export default UserPrefs;
