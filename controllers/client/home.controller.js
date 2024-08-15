const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")

module.exports.index = async (req, res) => {
  const producsFeatured = await Product.find({
    deleted: false,
    featured: "1",
    status: "active"
  })

  const newproducsFeatured = productsHelper.priceNewProducts(producsFeatured)

  const productsNew = await Product.find({
    deleted: false,
    status: "active"
  }).sort({ position: "desc" }).limit(6)

  const newproductsNew = productsHelper.priceNewProducts(productsNew)

  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    producsFeatured: newproducsFeatured,
    productsNew: newproductsNew
  })
}
