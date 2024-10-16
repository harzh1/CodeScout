import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

export const signup = asyncHandler(async (req, res, next) => {
  console.log("Request body:", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Invalid user data");
    err.status = 400;
    return next(err);
  }
  const { email, password, firstName, lastName, image } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    const err = new Error("User already exists. Please login instead.");
    err.status = 400;
    return next(err);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    const err = new Error("Could not create user. Please try again.");
    err.status = 500;
    return next(err);
  }

  const newUser = new User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    image,
    googleId: null,
    githubId: null,
    codingPlatforms: [],
    solvedProblems: [],
  });

  try {
    await newUser.save();
  } catch (error) {
    const err = new Error("Invalid user data");
    err.status = 400;
    return next(err);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1m" }
    );
  } catch (error) {
    const err = new Error("Could not create user. Please try again.");
    err.status = 500;
    return next(err);
  }

  res.status(201).json({ userId: newUser.id, email: newUser.email, token });
});

export const login = asyncHandler(async (req, res, next) => {
  console.log("Request body:", req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error("Invalid email or password");
    err.status = 401;
    return next(err);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, user.password);
  } catch (error) {
    const err = new Error(
      "Could not log you in. Please check your credentials and try again."
    );
    err.status = 500;
    return next(err);
  }

  if (!isValidPassword) {
    const err = new Error("Invalid email or password");
    err.status = 401;
    return next(err);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1m" }
    );
  } catch (error) {
    const err = new Error("Could not log you in. Please try again.");
    err.status = 500;
    return next(err);
  }

  res.json({ userId: user.id, email: user.email, token });
});
