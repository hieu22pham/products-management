const Account = require("../../models/account.model")

module.exports.index = async (req, res) => {
  res.render("admin/pages/my-account/index")
}

module.exports.edit = async (req, res) => {
  res.render("admin/pages/my-account/edit",
    {
      pageTitle: "Chỉnh sửa thông tin cá nhân"
    }
  )
}

module.exports.editPatch = async (req, res) => {
  const id = res.locals.user.id

  const emailExist = await Account.findOne({
    _id: { $ne: id },
    email: req.body.email,
    deleted: false
  })

  if (emailExist) {
    req.flash("error", `Email ${req.body.email} đã tồn tại`)
    res.redirect("back")
    return;
  }
  await Account.updateOne({ _id: id }, req.body)
  req.flash("success", "Cập nhật tài khoản thành công!")

  res.redirect("back")
}