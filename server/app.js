import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import formRouter from "./routes/form.route.js";
import submissionRouter from "./routes/submission.route.js";
const app = express();
import dotenv from "dotenv";
dotenv.config();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use("/api/forms", formRouter);
app.use("/api/submissions", submissionRouter);

export default app;
