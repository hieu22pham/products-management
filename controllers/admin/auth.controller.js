const Account = require("../../models/account.model")
const md5 = require("md5")
const systemConfig = require("../../config/system/system")

module.exports.login = async (req, res) => {

  res.render("admin/pages/auth/login", {
    pageTitle: "Đăng nhập",
  })
}

module.exports.loginPost = async (req, res) => {
  console.log(req.body)

  const email = req.body.email
  const password = req.body.password

  const user = await Account.findOne({
    email: email,
    deleted: false
  })

  if (!user) {
    req.flash("error", `Email ${email} không tồn tại! `)
    res.redirect("back")
  }
  else {
    if (md5(password) != user.password) {
      req.flash("error", `Sai mật khẩu`)
      res.redirect("back")
      return;
    }

    if (user.status == "inactive") {
      req.flash("error", `Tài khoản đã bị khóa`)
      res.redirect("back")
      return;
    }
    else {
      res.redirect(`${systemConfig.prefixAdmin}/dashboard/`)
    }
  }
}