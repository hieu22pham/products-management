const ProductCategory = require("../../models/product-category.model")
const createTreeHelper = require("../../helpers/createTree")

module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }

  const records = await ProductCategory.find(find)

  const newRecords = createTreeHelper.tree(records)

  res.render("admin/pages/product-category/index", {
    pageTitle: "Danh mục sản phẩm",
    records: newRecords
  })
}

module.exports.create = async (req, res) => {
  const records = await ProductCategory.find({
    deleted: false
  })

  const newRecords = createTreeHelper.tree(records)

  res.render("admin/pages/product-category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
    records: newRecords
  })
}

module.exports.createPost = async (req, res) => {
  const permissions = res.locals.role.permissions

  if (permissions.includes("products-category_create")) {
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
  else {
    res.redirect("back")
    return;
  }
}

module.exports.edit = async (req, res) => {
  const id = req.params.id;

  const data = await ProductCategory.findOne({
    _id: id,
    deleted: false
  })

  const records = await ProductCategory.find({
    deleted: false
  })

  const newRecords = createTreeHelper.tree(records)

  console.log(newRecords)

  // const newRecords = createTreeHelper.tree(records);

  res.render("admin/pages/product-category/edit", {
    pageTitle: "Chỉnh sửa danh mục sản phẩm",
    data: data,
    records: newRecords
  })
}

module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)

  try {

    await ProductCategory.updateOne({ _id: id }, req.body)

  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).send('Internal Server Error: ', err);
  }

  res.redirect("back")
}
