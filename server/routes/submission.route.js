import { Router } from "express";

const submissionRouter = Router();

import {
  createSubmission,
  getAllSubmissions,
} from "../controllers/submissions.controller.js";

submissionRouter.post("/:formId", createSubmission);
submissionRouter.get("/:formId/views", getAllSubmissions);

export default submissionRouter;
