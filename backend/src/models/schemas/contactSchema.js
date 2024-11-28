import mongoose from "mongoose";

export const contactSchema = new mongoose.Schema({
  phoneNum: [
    {
      type: { type: String, required: true },
      number: { type: String, required: true, unique: true },
    },
  ],
  email: [
    {
      type: { type: String, required: true },
      address: { type: String, required: true, unique: true },
    },
  ],
});
