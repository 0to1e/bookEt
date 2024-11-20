import express from "express";
import {
  authValidationRules,
  handleValidationResult,
  registrationValidationRules,
} from "../middleware/auth/validationMiddleware.js";
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
  handleValidationResult,
  initRegistration
);

router.post(
  "/login",
  authValidationRules,
  handleValidationResult,
  initAuthentication
);

router.post("/checkUnique",checkExistingAuthCredentials)
export default router;
