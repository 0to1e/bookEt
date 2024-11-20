import express from "express";
import {
  registrationValidationRules,
  handleValidationResult,
  authValidationRules,
} from "../middleware/user/userValidation.js";
import {
    checkExistingUserCredentials,
  initializeAuthentication,
  initializeRegistration,
} from "../controller/user.js";

const router = express.Router();

router.post(
  "/register",
  registrationValidationRules,
  handleValidationResult,
  initializeRegistration
);
router.post(
  "/login",
  authValidationRules,
  handleValidationResult,
  initializeAuthentication
);

router.post("/checkUnique", checkExistingUserCredentials)

export default router;
