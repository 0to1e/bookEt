import { body } from "express-validator";
import { isValidPhoneNumber } from "libphonenumber-js";
export const validationRules = [
  body("name")
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Distributor's name is required."),
  body("locations")
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Distributor's location is required."),
  body("contact.phoneNum")
    .isArray()
    .withMessage("Phone numbers must be an array")
    .custom((values) => {      
      values.forEach((value) => {
        if (!isValidPhoneNumber(value.number, "NP")) {
          throw new Error("Invalid Phone number ");
        }
      });
      return true;
    }),

  body("contact.email")
    .isArray({ min: 1 })
    .withMessage("At least one phone number is required.")
    .custom((value) => {
      value.forEach((email) => {
        if (!/\S+@\S+\.\S+/.test(email.address)) {
          throw new Error("Invalid email address format");
        }
      });
      return true;
    }),
  body("distributionRights")
    .optional()
    .isArray()
    .custom((rights) => {
      rights.forEach((right, index) => {
        if (!right.movieId) {
          throw new Error(
            `Distribution right at index ${index} must have a movieId`
          );
        }

        if (right.validFrom && right.validUntil) {
          const from = new Date(right.validFrom);
          const until = new Date(right.validUntil);

          if (from > until) {
            throw new Error(
              `Invalid date range for distribution right at index ${index}`
            );
          }
        }
      });

      return true;
    }),
  body("commission_rate")
    .isFloat()
    .withMessage("Invalid data type. Float required")
    .notEmpty()
    .withMessage("Distributor's commission rate is required."),
  body("isActive")
    .isBoolean()
    .withMessage("Invalid data type. Boolean required")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Distributor's status is required."),
];
