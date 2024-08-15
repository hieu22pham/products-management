const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")

module.exports.index = async (req, res) => {
  const producsFeatured = await Product.find({
    deleted: false,
    featured: "1",
    status: "active"
  })

  const newProducts = productsHelper.priceNewProducts(producsFeatured)

  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    producsFeatured: newProducts
  })
}
