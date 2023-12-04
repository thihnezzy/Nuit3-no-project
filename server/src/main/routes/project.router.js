const express = require("express")
const router = express.Router()
const jwtAuth = require("../middleware/jwt.auth")
const roleAuth = require("../middleware/role.auth")

const projectController = require("../controller").projectController


router.route("/projects")
    .get( [jwtAuth, roleAuth.isUser], projectController.getAll)
    .post( [jwtAuth, roleAuth.isUser], projectController.createOne)

router.route("/projects/:id")
    .get([jwtAuth, roleAuth.isUser], projectController.getOne)
    .delete([jwtAuth, roleAuth.isUser], projectController.deleteOne)


router.route("/projects/join/:projectId")
    .get([jwtAuth, roleAuth.isUser], projectController.joinToProject)

module.exports = router
