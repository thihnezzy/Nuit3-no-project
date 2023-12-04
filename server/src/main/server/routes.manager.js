const errorHandler = require("../errors/errorHandler")
const apiRouter = require("../routes")
const passport = require("passport")
let injectRoutes = (app) => {
    app.get("/", (req, res, next) => {
        res.status(200).send("Backend Works")
    })

    app.use("/api", apiRouter)

    // The error handler must be placed after all the used router
    app.use(errorHandler)

    // The 404 error handler must be placed after all other error handler
    app.use((req, res, next) => {
        res.status(404).send("404 invalid path")
    })
}

module.exports = {
    injectRoutes: injectRoutes
}