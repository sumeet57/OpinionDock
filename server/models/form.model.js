import mongoose from "mongoose";
import { formatTimestamp } from "../utils/users.util.js";

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  fields: {
    type: Array,
    required: true,
    default: [],
  },
  multipleSubmissions: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: formatTimestamp(),
  },
  updatedAt: {
    type: Date,
    default: formatTimestamp(),
  },
});

formSchema.pre("save", function (next) {
  this.updatedAt = formatTimestamp();
  next();
});

export const Form = mongoose.model("Form", formSchema);
