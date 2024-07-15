const Products = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")

module.exports.index = async (req, res) => {

  res.render("admin/pages/role/index", {
    pageTitle: "Nhóm quyền",
  })
}

module.exports.create = async (req, res) => {

  res.render("admin/pages/role/create", {
    pageTitle: "Tạo nhóm quyền",
  })
}
