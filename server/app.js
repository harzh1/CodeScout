import createError from "http-errors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import logger from "morgan";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./connectDB.js";
import passport from "passport"; // Import passport
import "./config/passportConfig.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());

mongoose.set("strictQuery", false);

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});
// Apply rate limiter to all requests
app.use(limiter);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression()); //Compress all routes
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
app.use(passport.initialize());
app.use("/api/users", usersRouter);

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Send the error response
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

export default app;
