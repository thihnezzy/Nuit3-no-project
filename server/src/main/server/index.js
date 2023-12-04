require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const session = require("express-session")
const config = require("../config")
const passport = require("../controller/passport.controller")

module.exports = function () {
    let app = express()

    let configApp = (config) => {
        app.set("trust proxy", true);
        app.use(cors(config.corsConfig.corsOptions))
        app.use(bodyParser.json())
        app.use(passport.initialize())
        app.use(session({
            secret: config.authConfig.session_secret,
            resave: false,
            httpOnly: true,
            saveUninitialized: true,
            store: config.databaseConfig.sessionMongo
        }))
        config.databaseConfig.connect()
        config.databaseConfig.initial()
    }

    let init = () => {
        configApp(config)
        let routeManager = require('./routes.manager')
        routeManager.injectRoutes(app)
    }

    let start = () => {
        let port = process.env.PORT
        app.listen(port, () => {
            console.log("app running on port " + port)
        })
    }

    return {
        init,
        start
    }
}