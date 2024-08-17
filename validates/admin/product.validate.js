module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", "Vui lòng nhập tiêu đề");
    res.redirect("back")

    return;
  }

  if (!req.body.product_category_id) {
    req.flash("error", "Vui lòng chọn danh mục!");
    res.redirect("back")

    return;
  }

  next();
}