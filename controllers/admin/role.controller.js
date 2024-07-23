const Products = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
const Role = require("../../models/roles.model")
const systemConfig = require("../../config/system/system")

module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }

  const records = await Role.find(find)

  res.render("admin/pages/role/index", {
    pageTitle: "Nhóm quyền",
    records: records
  })
}

module.exports.create = async (req, res) => {

  res.render("admin/pages/role/create", {
    pageTitle: "Tạo nhóm quyền",
  })
}

module.exports.createPost = async (req, res) => {
  const record = new Role(req.body)
  await record.save();

  res.redirect(`${systemConfig.prefixAdmin}/roles/create`)
}
