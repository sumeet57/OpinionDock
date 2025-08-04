import { verifyAccessToken } from "../utils/tokens.js";

export const verifiedUser = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Access token is required" });
  }
  token = token.split(" ")[1]; // Remove 'Bearer ' prefix
  const decoded = verifyAccessToken(token);
  if (!decoded) {
    return res.status(401).json({ error: "Invalid access token" });
  }
  req.user = { id: decoded.id };
  next();
};
