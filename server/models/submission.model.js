import mongoose from "mongoose";
import { formatTimestamp } from "../utils/users.util.js";

const submissionSchema = new mongoose.Schema({
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true,
  },
  userInfo: {
    name: String,
    email: String,
    phone: String,
  },
  answers: {
    type: Array,
    default: [],
  },
  submitedAt: {
    type: Date,
    default: formatTimestamp(),
  },
});

export const Submission = mongoose.model("Submission", submissionSchema);
