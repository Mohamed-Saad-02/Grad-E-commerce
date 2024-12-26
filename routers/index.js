const categoryRoute = require("./categoryRoute");
const brandRoute = require("./brandRoute");
const subCategoryRoute = require("./subCategoryRoute");
const productRoute = require("./productRoute");
const authRouter = require("./authRoute");
const userRouter = require("./userRoute");

const mountRoutes = (app) => {
  app.use("/api/v1/products", productRoute);
  app.use("/api/v1/categories", categoryRoute);
  app.use("/api/v1/subCategories", subCategoryRoute);
  app.use("/api/v1/brands", brandRoute);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/users", userRouter);
};

module.exports = mountRoutes;
