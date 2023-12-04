const express = require("express")
const router = express.Router()
const notificationController = require("../controller/").notificationController


const jwtAuth = require("../middleware/jwt.auth")
const roleAuth = require("../middleware/role.auth")




router.route("/notification/getAllNotification")
    .get([jwtAuth, roleAuth.isUser], notificationController.getAllNotificationsReceived)




module.exports = router