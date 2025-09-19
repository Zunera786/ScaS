// src/models/SoilReport.js
import mongoose from 'mongoose';

const soilReportSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', index: true },
    soilReport: { type: mongoose.Schema.Types.Mixed }, // JSON field
    solution: { type: mongoose.Schema.Types.Mixed },   // JSON field
  },
  { timestamps: true }
);

export default mongoose.model('SoilReport', soilReportSchema);
     