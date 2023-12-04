const express = require("express")
const router = express.Router()
const cloudinaryController = require("../controller").cloudinaryController


router.route("/image/upload")
    .post(cloudinaryController.uploadImage)

module.exports = router