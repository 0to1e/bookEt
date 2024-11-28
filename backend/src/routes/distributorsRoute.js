import express from "express";
import { validationRules } from "../middleware/validation/distributorsValidation.js";
import { prettyValidationResult } from "../utils/prettyValidationResult.js";
import { } from "../controller/distributorsController.js";

const router = express.Router();

router.post("/add", validationRules, prettyValidationResult, addDistributor);

router.get("/getAll", getAllDistributors);
router.post("/getByName", getDistributorByName);
router.post("/getActive", getActiveDistributors);

router.put("/update/:id", validationRules, prettyValidationResult, updateDistributor)

router.delete("/delete/:id", deleteDistributor)


router.post("/checkUnique", checkUniqueDistributors);
export default router;
