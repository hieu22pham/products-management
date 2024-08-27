const Cart = require("../../models/cart.model")

// [POST] /cart/add/:productId
module.exports.addPost = (req, res) => {
  const cartId = req.cookies.cartId
  const productId = req.params.productId
  const quantity = parseInt(req.body.quantity)

  console.log(cartId)
  console.log(productId)
  console.log(quantity)

  const

    res.send("Ok")
}