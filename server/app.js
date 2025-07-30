import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import formRouter from "./routes/form.route.js";
import submissionRouter from "./routes/submission.route.js";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use("/api/forms", formRouter);
app.use("/api/submissions", submissionRouter);

export default app;
