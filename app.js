const express = require("express");
const morgan = require("morgan");
const mountRoutes = require("./routers");
const AppError = require("./utils/appError");
const globalError = require("./middlewares/globalError");

const app = express();

// 1) MIDDLEWARE
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());

// 2) ROUTES
mountRoutes(app);

app.all("*", (req, res, next) =>
  next(new AppError(`Can't Find this route: ${req.originalUrl}`, 400))
);

// Handle Global Error
app.use(globalError);

module.exports = app;
