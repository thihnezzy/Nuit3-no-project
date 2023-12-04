const express = require("express")
const router = express.Router()
const userController = require("../controller/").userController
const jwtAuth = require("../middleware/jwt.auth")
const roleAuth = require("../middleware/role.auth")

router.route("/users/usermain")
    .get([jwtAuth, roleAuth.isUser], userController.userBoard)

router.route("/users/adminmain")
    .get([jwtAuth, roleAuth.isAdmin], userController.adminBoard)

module.exports = router