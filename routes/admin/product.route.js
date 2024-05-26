const express = require('express')
const multer = require("multer")
const router = express.Router();
const controller = require("../../controllers/admin/products.controller")
const storageter = require("../../helpers/storageMulter")
const validate = require("../../validates/admin/product.validate")

const upload = multer({ storage: storageter() })

router.get('/', controller.index)
router.patch('/change-status/:status/:id', controller.changeStatus)
router.patch('/change-multi', controller.changeMulti)
router.delete('/delete/:id', controller.deleteItem)
router.get('/create', controller.create)
router.post('/create',
  upload.single("thumbnail"),
  validate.createPost,
  controller.createPost)

router.get('/edit/:id', controller.edit)
router.patch('/edit/:id',
  upload.single("thumbnail"),
  validate.createPost,
  controller.editPatch)

router.get('/bin', controller.productsBin)
router.patch('/bin/change-status/:status/:id', controller.changeStatusBin)
router.patch('/bin/change-multi', controller.changeMultiBin)
router.delete('/bin/delete/:id', controller.deleteItemBin)
router.delete('/bin/restore/:id', controller.restoreItem)


module.exports = router;