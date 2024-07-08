const ProductCategory = require("../../models/product-category.model")


module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }

  const records = await ProductCategory.find(find)


  res.render("admin/pages/product-category/index", {
    pageTitle: "Danh mục sản phẩm",
    records: records
  })
}

module.exports.create = (req, res) => {
  res.render("admin/pages/product-category/create", {
    pageTitle: "Tạo danh mục sản phẩm"
  })
}

module.exports.createPost = async (req, res) => {

  if (req.body.position == "") {
    const countProducts = await ProductCategory.countDocuments();

    req.body.position = countProducts + 1
  } else {
    req.body.position = parseInt(req.body.position)
  }

  const record = new ProductCategory(req.body)
  await record.save()

  res.redirect("/admin/products-category")
}

module.exports.edit = (req, res) => {
  res.render("admin/pages/product-category/edit", {
    pageTitle: "Chỉnh sửa danh mục sản phẩm"
  })
}
