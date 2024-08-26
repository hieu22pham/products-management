const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")

module.exports.index = async (req, res) => {
  const keyword = req.query.keyword;
  if (keyword) {
    const keywordRegex = new RegExp(keyword, "i")

    const products = await Product.find({
      title: keywordRegex,
      status: "active",
      deleted: false
    })

    const newProducts = productsHelper.priceNewProducts(products)
    console.log(newProducts)
  }


  res.render("client/pages/search/index.pug", {
    pageTitle: "Tìm kiếm sản phẩm",
    keyword: keyword,
    products: newProducts
  })
}