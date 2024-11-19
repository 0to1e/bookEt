import { BlacklistedToken } from "../models/blackListTokens.js";

export const isTokenRevoked = async (token) => {
  const blacklistedToken = await BlacklistedToken.findOne({ token });
  return blacklistedToken !== null;
};

// Middleware to add token to blacklist
export const blacklistToken = async (token) => {
  const blacklistedToken = new BlacklistedToken({ token });
  await blacklistedToken.save();
};
