const Cart = require("../../models/cart.model")

// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
  try {
    const cartId = req.cookies.cartId
    const productId = req.params.productId
    const quantity = parseInt(req.body.quantity)

    const objectCart = {
      product_id: productId,
      quantity: quantity
    }
    console.log("card id:", cartId)
    console.log("productId", productId)
    console.log("quantity", quantity)

    await Cart.updateOne({
      _id: cartId
    },
      {
        $push: { products: objectCart }
      }
    )
    res.redirect("back")
  } catch (e) {
    console.log(e)
  }

}