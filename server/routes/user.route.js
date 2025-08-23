import { Router } from "express";
import {
  getAccessToken,
  getUser,
  login,
  register,
  updateUser,
  logout,
} from "../controllers/users.controller.js";
import { verifiedUser } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/get-user", verifiedUser, getUser);
userRouter.post("/update", verifiedUser, updateUser);
userRouter.post("/logout", verifiedUser, logout);
userRouter.get("/get-access-token", getAccessToken);
export default userRouter;
