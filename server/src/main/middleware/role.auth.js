const authService = require("../service/auth.service")
const errorHandler = require("../errors/errorHandler")
const UnauthorizedError = require("../errors/UnauthorizedError")
const RessourceNotFoundError = require("../errors/RessourceNotFoundError")

const { DB_ROLES } = process.env

let isAdmin = async (req, res, next) => {
    try {
        let is_admin = await authService.isAdmin(req.userId)
        if (is_admin) {
            return next()
        }
        throw new UnauthorizedError("access denied, wrong role")
    } catch (err) {
        next(err)
    }
}

let isUser = async (req, res, next) => {
    try {
        let is_user = await authService.isUser(req.userId)
        if (is_user) {
            return next()
        }
        let is_admin = await authService.isAdmin(req.userId)
        if (is_admin) {
            return next()
        }
        throw new UnauthorizedError("access denied, wrong role")
    } catch (err) {
        next(err)
    }
}

checkRolesExisted = (req, res, next) => {
    try {
        if (req.body.role) {
            if (!DB_ROLES.includes(req.body.role)) {
                console.log("here")
                throw new RessourceNotFoundError(message = "Role not found")
            }
        }
        return next()
    }catch(err) {
        next(err)
    }
};
module.exports = {
    isAdmin,
    isUser,
    checkRolesExisted
}