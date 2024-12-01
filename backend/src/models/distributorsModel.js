import mongoose from "mongoose";
import { contactSchema } from "./fieldTypeSchemas/contactSchema.js";
import {locationSchema} from '../models/fieldTypeSchemas/locationSchema.js'
const distributorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    locations: {
      type: [locationSchema],
      required: true,
    },
    contact: {
      type: contactSchema,
      required: true,
    },
    distribution_rights: [
      {
        movieId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Movie",
        },
        territories: [{ type: String, unique: true, required: false }],
        validFrom: { type: Date, required: false },
        validUntil: { type: Date, required: false },
      },
    ],
    commission_rate: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Distributor = mongoose.model("distributors", distributorSchema);
