import mongoose from "mongoose";
import { contactSchema } from "./schemas/contactSchema.js";

const distributorSchema = new mongoose.Schema(
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
    commissionRate: {
      type: float,
      required: true,
      default: 0.0,
    },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

export const Distributor = mongoose.model("distributors", distributorSchema);
