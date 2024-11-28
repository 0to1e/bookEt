import express from "express";
import { validationRules } from "../middleware/validation/movieValidation.js";
import { checkAndFormatDate } from "../middleware/utils/dateFormatter.js";
import { prettyValidationResult } from "../utils/prettyValidationResult.js";
import {
  addMovie,
  deleteMovie,
  updateMovie,
  checkUniqueMovies,
  getAllMovies,
  getMovieByName,
  getMoviesByCategory,
} from "../controller/moviesController.js";

const router = express.Router();

router.post("/add", validationRules, prettyValidationResult, addMovie);

router.get("/getAll", getAllMovies);
router.post("/getByName", getMovieByName);
router.post("/getByCategory", getMoviesByCategory);

router.put(
  "/update/:id",
  checkAndFormatDate,
  validationRules,
  prettyValidationResult,
  updateMovie
);

router.delete("/delete/:id", deleteMovie);

router.post("/checkUnique", checkUniqueMovies);
export default router;
