import mongoose from 'mongoose';

/* === Subschemas === */

// -- Individual Run Data --
const runSchema = new mongoose.Schema({
  runNumber: Number,
  distance: Number,            // in miles
  elevationDrop: Number,       // in feet
  elevationGain: Number,       // in feet
  duration: String             // format: HH:MM:SS
}, { _id: false });

// -- Embedded Resort Snapshot --
const resortSchema = new mongoose.Schema({
  name: { type: String, required: true },
  trails_open: Number,
  trails_total: Number,
  lifts_open: Number,
  lifts_total: Number,
  gondolas_open: Number,
  gondolas_total: Number,
  hours: String
}, { _id: false });

// -- Optional SOS Event (only in SOS session) --
const sosSchema = new mongoose.Schema({
  triggered: Boolean,
  message: String,
  lat: Number,
  lng: Number,
  timestamp: String,
  status: String
}, { _id: false });

// -- Optional GPS Track Array --
const trackPointSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  timestamp: String
}, { _id: false });


/* === Main Session Schema === */

const sessionSchema = new mongoose.Schema({
  sessionId: String,              // Unique ID for frontend reference
  userId: String,                 // Linked to mock user ID
  username: String,              // Snapshot of display name
  avatarIndex: Number,           // 0–8 avatar reference

  resort: resortSchema,          // Snapshot of resort at time of session

  date: { type: String, required: true },  // e.g., '2025-01-25'

  runs: [runSchema],             // Individual run breakdowns

  // -- Session Summary Stats --
  totalDistance: Number,
  elevationGain: Number,
  verticalDescent: Number,
  topSpeed: Number,
  averageSpeed: Number,
  runCount: Number,
  totalDuration: String,
  liftTime: String,
  restTime: String,

  // -- Optional Features --
  sosEvent: sosSchema,
  track: [trackPointSchema]

}, {
  timestamps: true               // Adds createdAt, updatedAt
});

const Session = mongoose.model('Session', sessionSchema);
export default Session;
