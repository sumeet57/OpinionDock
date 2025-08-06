import { getAccessToken } from "../controllers/users.controller.js";
import { verifyAccessToken } from "../utils/tokens.js";

export const verifiedUser = async (req, res, next) => {
  let token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ error: "Access token is required" });
  }
  const decoded = verifyAccessToken(token);
  if (!decoded) {
    getAccessToken(req, res)
      .then(() => {
        console.log("this runs");
        token = req.cookies.accessToken;
        const newDecoded = verifyAccessToken(token);
        if (!newDecoded) {
          return res.status(401).json({ error: "Invalid access token" });
        }
        req.user = { id: newDecoded.id };
        next();
      })
      .catch((error) => {
        return res.status(500).json({
          error: "Failed to refresh access token",
          details: error.message,
        });
      });
    return res.status(401).json({ error: "Invalid access token" });
  }
  req.user = { id: decoded.id };
  next();
};
