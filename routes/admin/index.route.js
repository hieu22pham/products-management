const dashboardRoutes = require("./dashboard.route")
const productRoutes = require("./product.route")
const authMiddleware = require("../../middlewares/admin/auth.middlewares.js")

const systemConfig = require("../../config/system/system.js")
const productCategoryRoutes = require("./product-category.route.js")
const roleRoutes = require("./role.route.js")
const accountRoute = require("./account.route.js")
const authRoute = require("./auth.route.js")

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin

  app.use(PATH_ADMIN + '/dashboard', authMiddleware.requireAuth, dashboardRoutes)
  app.use(PATH_ADMIN + '/products', authMiddleware.requireAuth, productRoutes)
  app.use(PATH_ADMIN + '/products-category', authMiddleware.requireAuth, productCategoryRoutes)
  app.use(PATH_ADMIN + '/roles', authMiddleware.requireAuth, roleRoutes)
  app.use(PATH_ADMIN + '/accounts', authMiddleware.requireAuth, accountRoute)
  app.use(PATH_ADMIN + '/auth', authRoute)


}