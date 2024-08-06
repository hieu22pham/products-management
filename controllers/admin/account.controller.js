const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
const Account = require("../../models/account.model")
const Role = require("../../models/roles.model")
const systemConfig = require("../../config/system/system")
const md5 = require("md5")

module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }

  const records = await Account.find(find)

  res.render("admin/pages/accounts/index", {
    pageTitle: "Danh sách tài khoản",
    records: records
  })
}

module.exports.create = async (req, res) => {
  const roles = await Role.find({ deleted: false })
  res.render("admin/pages/accounts/create", {
    pageTitle: "Danh sách tài khoản",
    roles: roles
  })
}

module.exports.createPost = async (req, res) => {
  const emailExist = await Account.findOne({
    email: req.body.email, deleted: false
  })

  if (emailExist) {
    req.flash("error", `Email ${req.body.email} đã tồn tại!`)
    res.redirect("back")
  }
  else {
    req.body.password = md5(req.body.password)

    const record = new Account(req.body)
    await record.save()

    res.redirect(`${systemConfig.prefixAdmin}/accounts/`)
  }

}
