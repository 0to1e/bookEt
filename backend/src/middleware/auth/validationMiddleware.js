import { validationResult, body } from "express-validator";
import { isValidPhoneNumber } from "libphonenumber-js";

export const registrationValidationRules = [
  body("full_name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Full name is required"),

  body("user_name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Username is required")
    .matches(/^[^@]+$/, "i")
    .withMessage("Username cannot contain the '@' character"),

  body("email")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("phone_number")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Phone number is required")
    .custom((value) => {
      if (!isValidPhoneNumber(value, "NP")) {
        throw new Error("Invalid Nepal phone number.");
      }
      return true;
    }),

  body("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/,
      "i"
    )
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
];

export const authValidationRules = [
  body("user_name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Username/Email is required")
    .custom((value) => {
      if (!value.includes("@")) {
        return true; // Treat it as a username
      }
      if (!/\S+@\S+\.\S+/.test(value)) {
        throw new Error("Invalid email format");
      }
      return true; // Treat it as a valid email
    }),

  body("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Password is required"),
];
export function handleValidationResult(request, response, next) {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    const formattedErrors = errors
      .array()
      .map((error) => ({ field: error.path, message: error.msg }));
    return response.status(400).json({ errors: formattedErrors });
  }
  next();
}