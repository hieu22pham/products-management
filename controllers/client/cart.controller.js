const Cart = require("../../models/cart.model")

// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
  const cartId = req.cookies.cartId
  const productId = req.params.productId
  const quantity = parseInt(req.body.quantity)

  const objectCart = {
    product_id: productId,
    quantity: quantity
  }
  console.log(cartId)
  console.log(productId)
  console.log(quantity)

  await Cart.updateOne({
    _id: cartId
  },
    {
      $push: { products: objectCart }
    })

}