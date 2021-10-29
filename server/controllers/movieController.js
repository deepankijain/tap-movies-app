const { Op } = require("sequelize");

const { Movie } = require("../models");

const getAllMovies = async (req, res) => {
  const { searchText } = req.query;

  try {
    const conditions = searchText
      ? {
          where: {
            title: {
              [Op.iRegexp]: searchText,
            },
          },
        }
      : {};
    const movies = await Movie.findAll(conditions);
    return res.json(movies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findOne({
      where: {
        id: Number(movieId),
      },
    });
    if (!movie) throw new Error("Movie Not Found.");
    return res.json({
      message: "Movie Found",
      movie,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

const addMovie = async (req, res) => {
  try {
    const { title, rating, plot, poster } = req.body;
    const createdMovie = await Movie.create({
      title,
      rating,
      plot,
      poster,
    });
    return res.json({
      message: "Movie Created.",
      movie: createdMovie,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllMovies,
  getMovie,
  addMovie,
};
