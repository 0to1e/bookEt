import { body } from "express-validator";

export const validationRules = [
  body("name")
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Distributor's name is requestuired."),
  body("Location")
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Distributor's location is requestuired."),
  body("description")
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Movie's description is requestuired."),
  // body("contact.phoneNum")
  //   .isArray()
  //   .withMessage("Phone numbers must be an array")
  //   .custom((value) => {
  //     // Check each phone number object
  //     value.forEach((phone) => {
  //       if (!phone.type || !["mobile", "landline"].includes(phone.type)) {
  //         throw new Error('Phone type must be "mobile" or "landline"');
  //       }
  //       if (!phone.number || !/^\d{10}$/.test(phone.number)) {
  //         throw new Error("Phone number must be 10 digits");
  //       }
  //     });
  //     return true;
  //   }),

  // body("contact.email")
  //   .isArray()
  //   .withMessage("Emails must be an array")
  //   .custom((value) => {
  //     // Check each email object
  //     value.forEach((email) => {
  //       if (!email.type || !["personal", "work"].includes(email.type)) {
  //         throw new Error('Email type must be "personal" or "work"');
  //       }
  //       if (!email.address || !/\S+@\S+\.\S+/.test(email.address)) {
  //         throw new Error("Invalid email address");
  //       }
  //     });
  //     return true;
  //   }).
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
