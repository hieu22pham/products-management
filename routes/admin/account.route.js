const express = require('express')
const router = express.Router();
const controller = require("../../controllers/admin/account.controller")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares")
const validate = require("../../validates/admin/account.validate")

const multer = require("multer")
const upload = multer()


router.get('/', controller.index)
router.get('/create', controller.create)
router.post('/create',
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost)

module.exports = router;