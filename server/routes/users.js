import express from "express";
const router = express.Router();
import { check } from "express-validator";
import * as users_controller from "../controllers/usersController.js";
import checkAuth from "../middleware/checkAuth.js";

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

router.get("/:id", checkAuth, users_controller.getUser);

router.patch("/:id", checkAuth, users_controller.updateUsername);

router.get("/:id/platforms", checkAuth, users_controller.getUserPlatforms);

export default router;
