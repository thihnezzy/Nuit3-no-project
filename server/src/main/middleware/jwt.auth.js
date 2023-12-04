const jwt = require("jsonwebtoken")
const authConfig = require("../config/auth.config")
const errorHandler = require("../errors/errorHandler")
const UnauthorizedError = require("../errors/UnauthorizedError")

let verifytoken = async (req, res, next) => {
    try {
        // console.log(req.session.token)
        //authen with session
        // const token = req.session.token
        //authen with header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const jwtReturn = await jwt.verify(token, authConfig.secret);
        req.userId = jwtReturn.id
        return next()
    } catch (err) {
        next(new jwt.JsonWebTokenError())
    }
}

module.exports = verifytoken