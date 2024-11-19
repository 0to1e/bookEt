import jsonwebtoken from "jsonwebtoken";

// Verify access token
export const verifyAccessToken = (token) => {
  try {
    return jsonwebtoken.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid access token");
  }
};

// Verify refresh token
export const verifyRefreshToken = (token) => {
  try {
    return jsonwebtoken.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};