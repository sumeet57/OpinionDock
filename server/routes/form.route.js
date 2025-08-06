import { Router } from "express";
import {
  createForm,
  getForms,
  getFormById,
} from "../controllers/forms.controller.js";
import { verifiedUser } from "../middlewares/auth.middleware.js";

const formRouter = Router();

formRouter.post("/submit", verifiedUser, createForm);
formRouter.get("/all", verifiedUser, getForms);
formRouter.get("/:formId", getFormById); //for user submission

export default formRouter;
