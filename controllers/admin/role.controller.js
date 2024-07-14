const Products = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")

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

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    pagination: objectPagination
  })
}
