// src/models/MarketSnapshot.js
import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema(
  {
    commodity: String,
    variety: String,
    unit: { type: String, default: 'INR/quintal' },
    min: Number,
    max: Number,
    modal: Number,
    market: String,
    state: String,
    date: String
  },
  { _id: false }
);

const marketSnapshotSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', index: true },
    region: String,
    prices: [priceSchema],
    source: { type: String, default: 'manual_or_external_ingest' }
  },
  { timestamps: true }
);

export default mongoose.model('MarketSnapshot', marketSnapshotSchema);
