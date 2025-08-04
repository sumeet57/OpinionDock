import { User } from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/tokens.js";
import {
  comparePassword,
  isValidEmail,
  isValidName,
  isValidPassword,
} from "../utils/users.util.js";

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // validate input
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  } else if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  } else if (!isValidPassword(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 5 characters long and contain both letters and numbers",
    });
  } else if (!isValidName(firstName, lastName)) {
    return res.status(400).json({
      error:
        "First and last names must be alphabetic and up to 15 characters long",
    });
  }

  // check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  // create new user
  try {
    const user = new User({ firstName, lastName, email, password });
    await user.save();
    // generate JWT tokens
    const aT = await generateAccessToken(user._id);
    const rT = await generateRefreshToken(user._id);
    // set tokens in cookies
    res.cookie("accessToken", aT, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res
      .status(201)
      .json({ tokens: { aT, rT }, message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  } else if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  } else if (!isValidPassword(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 5 characters long and contain both letters and numbers",
    });
  }

  // find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  // check password
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  // generate JWT tokens
  const aT = await generateAccessToken(user._id);
  const rT = await generateRefreshToken(user._id);

  // set tokens in cookies
  res.cookie("accessToken", aT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.status(200).json({ tokens: { aT, rT }, message: "Login successful" });
};

export const getUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAccessToken = async (req, res) => {
  const { rT } = req.tokens;
  if (!rT) {
    return res.status(401).json({ error: "Refresh token is required" });
  }
  try {
    const decoded = verifyRefreshToken(rT);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }
    const userId = decoded.id;
    const aT = await generateAccessToken(userId);
    let tokens = { aT, rT };
    res.status(200).json(tokens);
  } catch (error) {
    return res.status(401).json({ error: "Invalid refresh token" });
  }
};
