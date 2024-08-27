const productRouter = require("./products.route")
const homeRouter = require("./home.route")
const cartRouter = require("./cart.route")
const searchController = require("./search.route")
const categoryMiddleware = require("../../middlewares/client/category.middlewares")
const cartMiddleware = require("../../middlewares/client/cart.middlewares")

module.exports = (app) => {
  app.use(categoryMiddleware.category)
  app.use(cartMiddleware.cartId)

  app.use('/', homeRouter)

  app.use('/products', productRouter)
  app.use('/search', searchController)
  app.use('/cart', cartRouter)


}