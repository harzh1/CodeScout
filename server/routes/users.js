import express from "express";
const router = express.Router();
import { check } from "express-validator";
import * as users_controller from "../controllers/usersController.js";

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ message: "Express" });
});

router.post(
  "/signup",
  [
    check("email").isEmail().normalizeEmail(),
    check("password").isLength({ min: 6 }),
    check("firstName").isLength({ min: 1 }),
  ],
  users_controller.signup
);

router.post("/login", users_controller.login);

export default router;
