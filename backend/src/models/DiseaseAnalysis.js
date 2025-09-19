// src/models/DiseaseAnalysis.js
import mongoose from 'mongoose';

const diseaseAnalysisSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', index: true },
    image: {
      mimeType: String,
      base64: String
    },
    diagnosis: mongoose.Schema.Types.Mixed, // Store JSON diagnosis result here
    language: { type: String, default: 'en-IN' }
  },
  { timestamps: true }
);

export default mongoose.model('DiseaseAnalysis', diseaseAnalysisSchema);

