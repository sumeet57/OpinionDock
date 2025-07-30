import { Router } from "express";
import {
  createForm,
  getForms,
  getFormById,
} from "../controllers/forms.controller.js";

const formRouter = Router();

formRouter.post("/submit", createForm);
formRouter.get("/all", getForms);
formRouter.get("/:formId", getFormById); //for user submission

export default formRouter;
