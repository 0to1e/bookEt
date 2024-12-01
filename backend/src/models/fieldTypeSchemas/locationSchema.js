import mongoose from "mongoose";

export const locationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["HQ", "Branch", "Regional", "Satellite"],
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    coordinates: {
      latitude: {
        type: Number,
        required: false,
      },
      longitude: {
        type: Number,
        required: false,
      },
    },
  },
  { _id: false }
);
