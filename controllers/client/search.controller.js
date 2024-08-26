module.exports.index = async (req, res) => {
  res.render("client/pages/search/index.pug", {
    pageTitle: "Tìm kiếm sản phẩm",
  })
}