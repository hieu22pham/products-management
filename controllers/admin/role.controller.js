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

module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id
    let find = {
      _id: id,
      deleted: false
    }

    const data = await Role.findOne(find)
    console.log(data)

    res.render("admin/pages/role/edit", {
      pageTitle: "Sửa nhóm quyền",
      data: data
    })
  } catch (err) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
  }
}

module.exports.editPatch = async (req, res) => {
  const id = req.params.id
  console.log(id, "req:" + req.body)
  try {
    await Role.updateOne({ _id: id }, req.body)

  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).send('Internal Server Error: ', err);
  }
  res.redirect("back")
}

module.exports.permissions = async (req, res) => {
  let find = {
    deleted: false
  }

  const records = Role.find(find)

  res.render("admin/pages/role/permissions", {
    pageTitle: "Phân quyền",
    records: records
  })
}