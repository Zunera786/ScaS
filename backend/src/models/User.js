
// src/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

const languages = ['en', 'te', 'hi', 'bn', 'mr', 'ta', 'kn', 'ml', 'gu', 'pa'];
const farmerTypes = ['marginal', 'small', 'large'];

const phoneRegex = /^\+[1-9]\d{7,14}$/;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
   
    mobile: {
      type: String,
      trim: true,
      unique: true,
      sparse: true, // allow missing mobile but still unique when present
      validate: {
        validator: v => !v || phoneRegex.test(v),
        message: 'Mobile must be E.164 (e.g., +918328525095)',
      },
      index: true,
    },
    passwordHash: { type: String, required: true, select: false },
    age: {
      type: Number,
      min: [10, 'Age too low'],
      max: [120, 'Age too high'],
    },
    farmerType: {
      type: String,
      enum: farmerTypes,
    },
    location: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    preferences: {
      language: {
        type: String,
        enum: languages,
        default: 'en',
      },
    },
  },
  { timestamps: true }
);

// Virtual-only fields (not stored) for incoming raw password or confirmPassword
userSchema.virtual('password')
  .set(function (plain) { this._password = plain; });

userSchema.virtual('confirmPassword')
  .set(function (plain) { this._confirmPassword = plain; });

// Validate password/confirmPassword before save if password provided
userSchema.pre('save', async function (next) {
  try {
    // If a new password was provided via virtual, validate and hash
    if (this._password) {
      if (this._password.length < 6) {
        return next(new Error('Password must be at least 6 characters'));
      }
      if (this._password !== this._confirmPassword) {
        return next(new Error('Passwords do not match'));
      }
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      this.passwordHash = await bcrypt.hash(this._password, salt);
    }
    next();
  } catch (err) {
    next(err);
  }
});

// Helper for verifying password
userSchema.methods.verifyPassword = async function (candidate) {
  return bcrypt.compare(candidate, this.passwordHash);
};

export default mongoose.model('User', userSchema);
