const express = require("express")
const router = express.Router()
const profileController = require("../controller/").profileController
const jwtAuth = require("../middleware/jwt.auth")
const roleAuth = require("../middleware/role.auth")

// No need to include method names in the route paths
router.route("/profile/create")
    .post([jwtAuth, roleAuth.isUser], profileController.createOne)

router.route("/profile/get/:profileId")
    .get([jwtAuth, roleAuth.isUser], profileController.getOne)

router.route("/profile/delete/:profileId")
    .delete([jwtAuth, roleAuth.isUser], profileController.deleteOne)

router.route("/profile/update/:profileId")
    .put([jwtAuth, roleAuth.isUser], profileController.updateOne)

module.exports = router