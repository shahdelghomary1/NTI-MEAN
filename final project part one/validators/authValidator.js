import { body } from "express-validator";
export const registerValidation = [
  body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 chars"),
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars")
];
export const loginValidation = [
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars")
];
