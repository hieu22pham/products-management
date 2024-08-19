module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", "Vui lòng nhập tiêu đề");
    res.redirect("back")

    return;
  }

  if (!req.body.product_category_id) {
    res.redirect("back")

    return;
  }

  next();
}