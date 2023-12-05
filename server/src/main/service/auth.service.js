const DuplicateEmailError = require("../errors/DuplicateEmailError")
const userDao = require("../repository").userDAO
const UserError = require("../errors/UserError")
const RessourceNotFoundError = require("../errors/RessourceNotFoundError")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const BadCredentialsError = require("../errors/BadCredentialsError");

const { JWT_SECRET } = process.env


let signUp = async (data) => {
    if (!data.email || !data.password) {
        throw new RessourceNotFoundError("req.body missing some input attribute for sign_up create operation");
    }
    const existingUser = await userDao.findByEmail(data.email)
    if (existingUser) throw new DuplicateEmailError(message = "email is already existed")
    const user = userDao.create(data.email, data.password, "local")
    if (data.role) {
        const rolefind = await userDao.findRole({ $in: data.role })
        if (!rolefind || rolefind.length === 0) {
            throw new UserError.UserDataError("CreateUser: Role find error")
        }
        user.role = rolefind
    } else {
        const defaultRole = await userDao.findRole("user")
        if (!defaultRole || defaultRole.length === 0) {
            throw new UserError.UserDataError("CreateUser: Role findOne error")
        }
        user.role = defaultRole
    }
    await userDao.save(user)
    return user
}

let signIn = async (data) => {
    if (!data.email || !data.password) {
        throw new RessourceNotFoundError("req.body missing some input attribute for sign_in create operation");
    }
    const existingUser = await userDao.findByEmailWithRole(data.email)
    if (!existingUser) throw new UserError.UserDataError("signIn: No user found")

    let passwordIsValid = bcrypt.compareSync(data.password, existingUser.password)

    if (!passwordIsValid) {
        throw new BadCredentialsError("signIn: Wrong username or password")
    }

    const role = await userDao.findUserRole(existingUser)
    const token = jwt.sign({ id: existingUser.id },
        JWT_SECRET,
        {
            algorithm: "HS256",
            expiresIn: 86400
        });
    if (data.session) {
        data.session.token = token
        await data.session.save()
        console.log("session token is set")
    }
    return {
        id: existingUser._id,
        token: token,
        role: role[0].name
    }
}

let isAdmin = async (userId) => {
    const existingUser = await userDao.findById(userId)
    if (!existingUser) throw new UserError.UserSessionError("user is not existed");
    const role = await userDao.findUserRole(existingUser)
    return role[0].name === "admin"
}
let isUser = async (userId) => {
    const existingUser = await userDao.findById(userId)
    if (!existingUser) throw new UserError.UserSessionError("this id is not current in the session");
    const role = await userDao.findUserRole(existingUser)
    return role[0].name === "user"
}
let authService = {
    signUp,
    signIn,
    isAdmin,
    isUser,
}

module.exports = authService