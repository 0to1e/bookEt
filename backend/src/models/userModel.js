import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import libphonenumber from "libphonenumber-js";

const jwt = jsonwebtoken;
const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
      unique: true,
    },

    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    phoneNumber: {
      type: String,
      required: true,
      //   validate: {
      //     validator(value) {
      //       const phoneNumber = libphonenumber.parsePhoneNumber(value, "US"); // Default to US country code or customize
      //       return phoneNumber.isValid();
      //     },
      //     message: "Please enter a valid phone number",
      //   },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "MODERATOR"],
      default: "USER",
    },
    reset_password_token: {
      type: String,
      default: null,
    },
    reset_password_expiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJWTToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRET_EXPIRY,
  });
};

// Method to generate a refresh token
userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRY,
  });
};

userSchema.methods.generateResetToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.reset_password_token = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.reset_password_expiry = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

userSchema.index({ email: 1 });
userSchema.index({ user_name: 1 });
userSchema.index({ phoneNumber: 1 });

export const User = mongoose.model("user", userSchema);