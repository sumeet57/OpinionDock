import mongoose from "mongoose";
import { formatTimestamp, hashPassword } from "../utils/users.util.js";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    enum: ["free", "premium"],
    default: "free",
  },
  createdAt: {
    type: Date,
    default: formatTimestamp(),
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const p = hashPassword(this.password);
  this.password = p;
  next();
});

export const User = mongoose.model("User", userSchema);
