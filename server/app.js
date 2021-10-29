require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const apiRoutes = require("./routes");
require("./models");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

//Routes
app.use("/api", apiRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
