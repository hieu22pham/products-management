const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")

module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId
  const cart = await Cart.findOne({
    _id: cartId
  })

  if (cart.products.length > 0) {
    cart.totalFullProduct = 0;
    for (const item of cart.products) {
      const productId = item.product_id

      const productInfo = await Product.findOne({
        _id: productId
      })

      productInfo.priceNew = productsHelper.priceNewProduct(productInfo)
      item.productInfo = productInfo
      item.totalPrice = item.quantity * productInfo.priceNew
      cart.totalFullProduct = cart.totalFullProduct + item.totalPrice
    }
  }

  res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hàng",
    cartDetail: cart
  })
}

// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
  try {
    const cartId = req.cookies.cartId
    const productId = req.params.productId
    const quantity = parseInt(req.body.quantity)

    const cart = await Cart.findOne({
      _id: cartId
    })

    const existProductInCart = cart.products.find(item => item.product_id == productId)

    if (existProductInCart) {
      const newQuantity = quantity + existProductInCart.quantity
      await Cart.updateOne(
        {
          _id: cartId,
          'products.product_id': productId
        },
        {
          'products.$.quantity': newQuantity
        }
      )
    } else {
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
    }

    req.flash("success", "Thêm vào giỏ hàng thành công!")
    res.redirect("back")
  } catch (e) {
    console.log(e)
  }
}

//GET[delete]
module.exports.delete = async (req, res) => {
  const productId = req.params.productId
  const cartId = req.cookies.cartId

  await Cart.updateOne({
    _id: cartId,
  }, {
    "$pull": { products: { "product_id": productId } }
  })
  console.log(productId)
  res.redirect("back")
}

module.exports.update = async (req, res) => {
  const productId = req.params.productId
  const quantity = req.params.quantity
  const cartId = req.cookies.cartId

  await Cart.updateOne(
    {
      _id: cartId,
      'products.product_id': productId
    },
    {
      'products.$.quantity': quantity
    }
  )

  req.flash("success", "Cập nhật số lượng thành công!")
  res.redirect("back")
}