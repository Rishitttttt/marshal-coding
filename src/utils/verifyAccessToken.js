import jwt from "jsonwebtoken";

export const verifyAccessToken = (token) => {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return decoded; // { userId, email, ... }
  } catch (err) {
    return null;
  }
};
