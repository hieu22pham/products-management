const systemConfig = require("../../config/system/system");

module.exports.requireAuth = (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
  } else {
    next()
  }


}