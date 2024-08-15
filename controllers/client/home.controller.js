const Product = require("../../models/product.model")

module.exports.index = async (req, res) => {
  const producsFeatured = await Product.find({
    deleted: false,
    featured: "1",
    status: "active"
  })

  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    producsFeatured: producsFeatured
  })
}
