import mongoose from 'mongoose'

const blacklistSchema = new mongoose.Schema(
    {
      token: { type: String, required: true, unique: true },
      createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
  );
  
  export const BlacklistedToken = mongoose.model("blacklistedToken", blacklistSchema);