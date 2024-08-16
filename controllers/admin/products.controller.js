const Products = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
const Product = require("../../models/product.model")
const systemConfig = require("../../config/system/system")
const createTreeHelper = require("../../helpers/createTree")
const ProductCategory = require("../../models/product-category.model")
const Account = require("../../models/account.model")

module.exports.index = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query)

  let find = {
    deleted: false
  }
  if (req.query.status) {
    find.status = req.query.status;
  }

  const objectSearch = searchHelper(req.query)

  if (objectSearch.regex) {
    find.title = objectSearch.regex
  }

  // pagination
  const countProduct = await Products.countDocuments(find)

  let objectPagination = paginationHelper({
    currentPage: 1,
    limitItem: 4
  }, req.query, countProduct
  )

  console.log(objectPagination.currentPage)
  // end pagination

  //sort
  let sort = {}

  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue
  } else {
    sort.position = "desc"
  }

  //end sort

  const products = await Products.find(find).sort(sort)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip)

  for (const product of products) {
    const account = await Account.findOne({ _id: product.createdBy.account_id })

    if (account) {
      product.accountFullName = account.fullName
    }

    const updatedBy = product.updatedBy[product.updatedBy.length - 1]

    if (updatedBy) {
      const accountUpdated = await Account.findOne({ _id: updatedBy.account_id })
      product.updatedByUser = accountUpdated.fullName
    }
  }

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    pagination: objectPagination
  })
}

module.exports.changeStatus = async (req, res) => {
  const status = req.params.status
  const id = req.params.id

  const updatedBy = {
    account_id: res.locals.user.id,
    updatedAt: new Date()
  }

  await Products.updateOne({ _id: id }, {
    status: status,
    $push: { updatedBy: updatedBy }
  })
  req.flash("success", "Cập nhật thành công!")

  res.redirect("back")
}

module.exports.changeMulti = async (req, res) => {
  const type = req.body.type
  const ids = req.body.ids.split(", ")

  const updatedBy = {
    account_id: res.locals.user.id,
    updatedAt: new Date()
  }

  switch (type) {
    case "active":
      await Products.updateMany({ _id: { $in: ids } }, {
        status: "active",
        $push: { updatedBy: updatedBy }
      })
      req.flash("success", `Cập nhật thành công ${ids.length} sản phẩm!`)
      break;
    case "inactive":
      await Products.updateMany({ _id: { $in: ids } }, {
        status: "inactive",
        $push: { updatedBy: updatedBy }
      })
      req.flash("success", `Cập nhật thành công ${ids.length} sản phẩm!`)
      break;
    case "delete-all":
      await Products.updateMany({ _id: { $in: ids } }, { deleted: true, deletedAt: new Date() })
      req.flash("success", `Xóa thành công ${ids.length} sản phẩm!`)
      break;
    case "change-position":
      console.log(ids)
      for (const item of ids) {
        let [id, position] = item.split("-")
        postion = parseInt(position)
        await Products.updateOne({ _id: id }, {
          position: position,
          $push: { updatedBy: updatedBy }
        })
        req.flash("success", `Đổi vị trí thành công ${ids.length} sản phẩm!`)
      }
      break;
    default:

      break;
  }

  res.redirect("back")
}

module.exports.deleteItem = async (req, res) => {
  const id = req.params.id

  // await Products.deleteOne({ _id: id })
  await Products.updateOne({ _id: id },
    {
      deleted: true,
      deletedBy: {
        account_id: res.locals.user.id,
        deletedAt: new Date()
      }
    }
  )

  req.flash("success", `Xóa sản phẩm thành công!`)

  res.redirect("back")
}

module.exports.create = async (req, res) => {
  const records = await ProductCategory.find({
    deleted: false
  })

  const category = createTreeHelper.tree(records)

  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",
    category: category
  })
}

module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)

  if (req.body.position == "") {
    const countProducts = await Product.countDocuments();

    req.body.position = countProducts + 1
  } else {
    req.body.position = parseInt(req.body.position)
  }

  req.body.createdBy = {
    account_id: res.locals.user.id
  }

  const product = new Product(req.body)
  await product.save()

  res.redirect("/admin/products")
}

module.exports.edit = async (req, res) => {
    const records = await ProductCategory.find({
      deleted: false
    })

    const category = createTreeHelper.tree(records)

    const find = {
      deleted: false,
      _id: req.params.id
    }

    const product = await Product.findOne(find)
    console.log(product)

    const categoryName = await ProductCategory.findOne({ _id: product.product_category_id })
    console.log("tittle:", categoryName.title)

    res.render("admin/pages/products/edit", {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product,
      category: category,
      categoryName: categoryName
    })
 
}

module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  console.log(id)
  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)

  console.log("req:", req.body)
  console.log("id:", id)
  try {
    const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date()
    }
    await Product.updateOne({ _id: id }, {
      ...req.body, $push: { updatedBy: updatedBy }
    })

  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).send('Internal Server Error: ', err);
  }

  res.redirect("back")
}

module.exports.detail = async (req, res) => {
  const id = req.params.id
  const find = {
    deleted: false,
    _id: req.params.id
  }

  const product = await Product.findOne(find)
  var category = { title: "" }
  if (product.product_category_id) {
    category = await ProductCategory.findOne({
      _id: product.product_category_id,
      deleted: false
    })
  }

  res.render("admin/pages/products/detail", {
    pageTitle: product.title,
    product: product,
    categoryTitle: category.title
  })
}

module.exports.productsBin = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query)

  let find = {
    deleted: true
  }
  if (req.query.status) {
    find.status = req.query.status;
  }

  const objectSearch = searchHelper(req.query)

  if (objectSearch.regex) {
    find.title = objectSearch.regex
  }

  // pagination
  const countProduct = await Products.countDocuments(find)

  let objectPagination = paginationHelper({
    currentPage: 1,
    limitItem: 4
  }, req.query, countProduct
  )

  console.log(objectPagination.currentPage)
  // end pagination

  const products = await Products.find(find).sort({ position: "desc" }).limit(objectPagination.limitItem).skip(objectPagination.skip)

  res.render("admin/pages/products/productsBin", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    pagination: objectPagination
  })
}

module.exports.changeStatusBin = async (req, res) => {
  const status = req.params.status
  const id = req.params.id

  await Products.updateOne({ _id: id }, { status: status })
  req.flash("success", "Cập nhật thành công!")

  res.redirect("back")
}

module.exports.changeMultiBin = async (req, res) => {
  const type = req.body.type
  const ids = req.body.idsbin.split(", ")

  switch (type) {
    case "delete-all-vv":
      await Products.deleteMany({ _id: { $in: ids } })
      req.flash("success", `Xóa thành công ${ids.length} sản phẩm!`)
      break;
    case "restore-all":
      await Products.updateMany({ _id: { $in: ids } }, { deleted: false })
      req.flash("success", `Khôi phục thành công ${ids.length} sản phẩm!`)
      break;
    default:

      break;
  }

  res.redirect("back")
}

module.exports.deleteItemBin = async (req, res) => {
  const id = req.params.id

  await Products.deleteOne({ _id: id })
  req.flash("success", `Xóa sản phẩm thành công!`)

  res.redirect("back")
}

module.exports.restoreItem = async (req, res) => {
  const id = req.params.id

  await Products.updateOne({ _id: id }, { deleted: false })
  req.flash("success", `Khôi phục sản phẩm thành công!`)

  res.redirect("back")
}

