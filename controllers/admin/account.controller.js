const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
const Account = require("../../models/account.model")
const systemConfig = require("../../config/system/system")

module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }

  const records = await Account.find(find)

  res.render("admin/pages/account/index", {
    pageTitle: "Danh sách tài khoản",
    records: records
  })
}
