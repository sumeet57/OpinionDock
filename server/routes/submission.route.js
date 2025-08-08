import { Router } from "express";

const submissionRouter = Router();

import {
  createSubmission,
  getAllSubmissions,
} from "../controllers/submissions.controller.js";
import { verifiedUser } from "../middlewares/auth.middleware.js";

submissionRouter.post("/:formId", createSubmission);
submissionRouter.get("/:formId/views", verifiedUser, getAllSubmissions);

export default submissionRouter;
