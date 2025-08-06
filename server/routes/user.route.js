import { Router } from "express";
import {
  getAccessToken,
  getUser,
  login,
  register,
} from "../controllers/users.controller.js";
import { verifiedUser } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/get-user", verifiedUser, getUser);
userRouter.get("/get-access-token", getAccessToken);
export default userRouter;
