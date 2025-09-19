// src/models/WeatherSnapshot.js
import mongoose from 'mongoose';

const weatherSnapshotSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', index: true },
    lat: Number,
    lon: Number,
    provider: { type: String, default: 'openweather' },
    payload: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

export default mongoose.model('WeatherSnapshot', weatherSnapshotSchema);
