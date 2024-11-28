import express from "express";
import {
  authValidationRules,
  registrationValidationRules,
} from "../middleware/validation/authValidation.js";
import {prettyValidationResult} from '../utils/prettyValidationResult.js'
import {
  checkExistingAuthCredentials,
  initAuthentication,
  initRegistration,
} from "../controller/authController.js";
const router = express.Router();

router.get("/test", (request, response) => {
  return response.status(200).json({ message: "Test successful" });
});

router.post(
  "/register",
  registrationValidationRules,
  prettyValidationResult,
  initRegistration
);

router.post(
  "/login",
  authValidationRules,
  prettyValidationResult,
  initAuthentication
);

router.post("/checkUnique", checkExistingAuthCredentials);
export default router;
