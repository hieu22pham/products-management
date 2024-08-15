const productRouter = require("./products.route")
const homeRouter = require("./home.route")
const categoryMiddleware = require("../../middlewares/client/category.middlewares")

module.exports = (app) => {
  app.use(categoryMiddleware.category)

  app.use('/', homeRouter)

  app.use('/products', productRouter)
}