import mongoose from "mongoose";
import { contactSchema } from "./schemas/contactSchema.js";

const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: dict,
      required: true,
    },
    contact: {
      type: contactSchema,
      required: true,
      unique: true,
    },
    hallIds: {
      type: Map,
      of: String,
    },
    commissionRate: {
      type: float,
      required: true,
      default: 0.0,
    },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

export const Theatre = mongoose.model("theatres", theatreSchema);
