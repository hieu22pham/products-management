const productsHelper = require("../../helpers/products")
const ProductCategory = require("../../models/product-category.model")
const Product = require("../../models/product.model")

module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false
  }).sort({ position: "desc" });

  console.log(products)
  const newProducts = productsHelper.priceNewProducts(products)

  res.render("client/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: newProducts
  })
}

module.exports.detail = async (req, res) => {

  try {
    const find = {
      deleted: false,
      slug: req.params.slug,
      status: "active"
    }

    const product = await Product.findOne(find)

    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product
    })
  } catch (error) {
    res.redirect(`/products`)
  }

}

module.exports.category = async (req, res) => {
  const category = await ProductCategory.findOne({
    slug: req.params.slugCategory,
    deleted: false
  })

  var products
  if (category.id) {
    products = await Product.find({
      deleted: false,
      product_category_id: category.id
    })
  } else {
    products = await Product.find({
      deleted: false,
    })
  }

  const newProducts = productsHelper.priceNewProducts(products)

  res.render("client/pages/products/index.pug", {
    pageTitle: category.title,
    products: newProducts
  })
}