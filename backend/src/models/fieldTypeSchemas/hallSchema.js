import mongoose from 'mongoose'

export const hallSchema = new mongoose.Schema({
    name: { type: String, required: true },
    totalSeats: { type: Number, required: true }
  });