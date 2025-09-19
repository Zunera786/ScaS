// models/Blacklist.js
import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: '7d' } 
  // token auto-deletes after 7 days (same as your JWT expiry)
});

export default mongoose.model("Blacklist", blacklistSchema);
