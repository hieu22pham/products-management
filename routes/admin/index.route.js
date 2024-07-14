const dashboardRoutes = require("./dashboard.route")
const productRoutes = require("./product.route")

const systemConfig = require("../../config/system/system.js")
const productCategoryRoutes = require("./product-category.route.js")
const roleRoutes = require("./role.route.js")

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin

  app.use(PATH_ADMIN + '/dashboard', dashboardRoutes)
  app.use(PATH_ADMIN + '/products', productRoutes)
  app.use(PATH_ADMIN + '/products-category', productCategoryRoutes)
  app.use(PATH_ADMIN + '/roles', roleRoutes)
}