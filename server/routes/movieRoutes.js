const express = require("express");

const {
  addMovie,
  getAllMovies,
  getMovie,
} = require("../controllers/movieController");

const router = express.Router();

router.get("/", getAllMovies).post("/", addMovie).get("/:movieId", getMovie);

module.exports = router;
