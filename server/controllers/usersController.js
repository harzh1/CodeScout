import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import CodingPlatform from "../models/codingPlatform.js";
import passport from "passport";

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
      { expiresIn: "1d" }
    );
  } catch (error) {
    const err = new Error("Could not create user. Please try again.");
    err.status = 500;
    return next(err);
  }

  res.status(201).json({ userId: newUser.id, email: newUser.email, token });
});

export const googleAuth = (req, res, next) => {
  const redirect_uri = req.query.redirect_uri;
  if (!redirect_uri) {
    return res.status(400).json({ message: "Missing redirect URI" });
  }

  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: encodeURIComponent(redirect_uri), // Store redirect_uri in state
  })(req, res, next);
};

export const googleAuthCallback = (req, res, next) => {
  const redirect_uri = req.query.state
    ? decodeURIComponent(req.query.state)
    : null; // Retrieve from state

  passport.authenticate("google", { session: false }, async (err, user) => {
    if (err || !user) {
      console.log("Error:", err);
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("Redirect URI:", redirect_uri);

    if (!redirect_uri) {
      return res.status(400).json({ message: "Missing redirect URI" });
    }

    // Redirect to the provided frontend URL
    res.redirect(`${redirect_uri}?token=${token}`);
  })(req, res, next);
};

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
      { expiresIn: "1d" }
    );
  } catch (error) {
    const err = new Error("Could not log you in. Please try again.");
    err.status = 500;
    return next(err);
  }

  res.json({ userId: user.id, email: user.email, token });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  console.log("User ID:", userId);
  const user = await User.findById(userId);
  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    return next(err);
  }
  res.json(user);
});

export const updateUsername = asyncHandler(async (req, res, next) => {
  const userId = req.params.id; // userId from URL params
  const { platformUrl, newUsername, firstName, lastName, profileUpdate, platformUpdate } = req.body;

  try {
    const user = await User.findById(userId).populate("codingPlatforms");
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }

    console.log("User:", user);
    console.log("Request body:", req.body);

    // Handle profile updates (firstName, lastName)
    if (profileUpdate || (firstName !== undefined || lastName !== undefined) && !platformUpdate) {
      console.log("Handling profile update");
      
      if (firstName !== undefined) {
        user.firstName = firstName;
      }
      if (lastName !== undefined) {
        user.lastName = lastName;
      }
      
      await user.save();
      return res.status(200).json({ 
        message: "Profile updated successfully", 
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      });
    }

    // Handle platform updates (existing logic)
    if (platformUpdate || (platformUrl && newUsername !== undefined)) {
      console.log("Handling platform update");
      console.log("Platform URL:", platformUrl);
      console.log("New Username:", newUsername);

      let platform = user.codingPlatforms.find(
        (platform) =>
          platform.platformUrl.toLowerCase() === platformUrl.toLowerCase()
      );

      if (platform) {
        platform.username = newUsername;
        await platform.save();
        return res
          .status(200)
          .json({ message: "Platform username updated successfully", platform });
      } else {
        console.log("Creating new platform");
        const newPlatform = new CodingPlatform({
          username: newUsername,
          platformUrl: platformUrl,
        });

        const savedPlatform = await newPlatform.save();

        user.codingPlatforms.push(savedPlatform);
        await user.save();
        return res.status(200).json({ 
          message: "Platform username added successfully", 
          platform: savedPlatform 
        });
      }
    }

    // If neither profile nor platform data is provided
    const err = new Error("Invalid update request. Please provide either profile data (firstName, lastName) or platform data (platformUrl, newUsername)");
    err.status = 400;
    return next(err);

  } catch (error) {
    console.error("Update error:", error);
    const err = new Error("Could not update user data");
    err.status = 500;
    return next(err);
  }
});

export const getUserPlatforms = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  console.log("User ID:", userId);

  try {
    const user = await User.findById(userId).populate(
      "codingPlatforms",
      "username platformUrl"
    );

    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }

    res.json(user.codingPlatforms);
  } catch (error) {
    const err = new Error("Could not fetch platforms");
    err.status = 500;
    return next(err);
  }
});
