import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/**
 * @des POST /api/auth/register
 * @access Public
 */
router.post(
  "/register",
  [
    body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 chars"),
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars")
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { name, email, password } = req.body;

      const exists = await User.findOne({ email });
      if (exists) return res.status(409).json({ message: "Email already registered" });

      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashed });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d"
      });

      return res.status(201).json({
        user: { id: user._id, name: user.name, email: user.email },
        token
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @des POST /api/auth/login
 * @access Public
 */
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars")
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: "Invalid credentials" });

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d"
      });

      return res.json({
        user: { id: user._id, name: user.name, email: user.email },
        token
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
