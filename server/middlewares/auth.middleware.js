import { getAccessToken } from "../controllers/users.controller.js";
import {
  generateAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/tokens.js";

export const verifiedUser = async (req, res, next) => {
  let token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ error: "Access token is required" });
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    return res.status(401).json({ error: "Invalid access token" });
  }
  req.user = { id: decoded.id };
  next();
};
