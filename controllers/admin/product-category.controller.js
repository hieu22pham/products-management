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

module.exports.edit = async (req, res) => {
  const id = req.params.id;

  const data = await ProductCategory.findOne({
    _id: id,
    deleted: false
  })

  res.render("admin/pages/product-category/edit", {
    pageTitle: "Chỉnh sửa danh mục sản phẩm",
    data: data
  })
}

module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)



  console.log("req:", req.body)
  console.log("id:", id)
  try {

    await ProductCategory.updateOne({ _id: id }, req.body)

  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).send('Internal Server Error: ', err);
  }

  res.redirect("back")
}
