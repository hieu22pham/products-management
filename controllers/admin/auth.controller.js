const Account = require("../../models/account.model")
const md5 = require("md5")

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
    res.send("Ok")
  }
}