const categoryRoute = require("./categoryRoute");
const brandRoute = require("./brandRoute");
const subCategoryRoute = require("./subCategoryRoute");
const productRoute = require("./productRoute");

const mountRoutes = (app) => {
  app.use("/api/v1/products", productRoute);
  app.use("/api/v1/categories", categoryRoute);
  app.use("/api/v1/subCategories", subCategoryRoute);
  app.use("/api/v1/brands", brandRoute);
};

module.exports = mountRoutes;
