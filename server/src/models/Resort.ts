import mongoose from 'mongoose';

const resortSchema = new mongoose.Schema({
  name: { type: String, required: true },
  trails_open: { type: Number, default: 0 },
  trails_total: { type: Number, default: 0 },
  lifts_open: { type: Number, default: 0 },
  lifts_total: { type: Number, default: 0 },
  gondolas_open: { type: Number, default: 0 },
  gondolas_total: { type: Number, default: 0 },
  snowpack_in: { type: Number, default: 0 }, // inches
  hours: { type: String, default: 'Unavailable' },
  website: { type: String, default: '' },
  image: { type: String, default: '' },
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
});

const Resort = mongoose.model('Resort', resortSchema);
export default Resort;
