const express = require("express")
const routes = express.Router()
const userRouter = require("./user.router")
const authRouter = require("./auth.router")
const projectRouter = require("./project.router")
const notificationRouter = require("./notification.router")
const profileRouter = require("./profile.router")

routes.use(authRouter)
routes.use(userRouter)
routes.use(profileRouter)
routes.use(projectRouter)
routes.use(notificationRouter)

module.exports = routes