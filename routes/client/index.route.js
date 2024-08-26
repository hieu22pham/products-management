const productRouter = require("./products.route")
const homeRouter = require("./home.route")
const searchController = require("./search.route")
const categoryMiddleware = require("../../middlewares/client/category.middlewares")
const cartMiddleware = require("../")

module.exports = (app) => {
  app.use(categoryMiddleware.category)

  app.use('/', homeRouter)

  app.use('/products', productRouter)
  app.use('/search', searchController)


}