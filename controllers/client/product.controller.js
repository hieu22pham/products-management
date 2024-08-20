const productsHelper = require("../../helpers/products")
const ProductCategory = require("../../models/product-category.model")
const Product = require("../../models/product.model")
const productCategoryHelper = require("../../helpers/product-category")

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
  var products
  console.log(req.params.slugCategory)
  const category = await ProductCategory.findOne({
    slug: req.params.slugCategory,
    deleted: false,
    status: "active"
  })
  var listSubCategory = null


  if (req.params.slugCategory) {

    if (category) {
      listSubCategory = await productCategoryHelper.getSubCategory(category.id)
      const listSubCategoryId = listSubCategory.map(item => item.id)

      products = await Product.find({
        deleted: false,
        product_category_id: { $in: [category.id, ...listSubCategoryId] },
      }).sort({ position: "desc" })
      console.log("Ok")

      const newProducts = productsHelper.priceNewProducts(products)

      res.render("client/pages/products/index.pug", {
        pageTitle: products.title,
        products: newProducts
      })
      return;
    } else {
      products = await Product.find({
        deleted: false,
      }).sort({ position: "desc" })
      console.log("Loi")

      const newProducts = productsHelper.priceNewProducts(products)

      res.render("client/pages/products/index.pug", {
        pageTitle: products.title,
        products: newProducts
      })
      return;
    }

  } else {
    products = await Product.find({
      deleted: false,
    }).sort({ position: "desc" })
    const newProducts = productsHelper.priceNewProducts(products)

    res.render("client/pages/products/index.pug", {
      pageTitle: products.title,
      products: newProducts
    })
    return;
  }


}