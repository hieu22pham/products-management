const Cart = require("../../models/cart.model")

module.exports.cartId = (req, res, next) => {
  console.log(req.cookies.cardId)
  if (!req.cookies.cardId) {
    const cart = new Cart()
    await cart.save()
  } else {

  }


  next()
}