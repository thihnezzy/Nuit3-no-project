const DuplicateEmailError = require("./DuplicateEmailError");
const UnauthorizedError = require("./UnauthorizedError")
const NoTokenError = require("./TokenError").NoTokenError
const InvalidTokenError = require("./TokenError").InvalidTokenError
const UserDataError = require("./UserError").UserDataError
const UserSessionError = require("./UserError").UserSessionError
const RessourceNotFoundError = require("./RessourceNotFoundError");
const { JsonWebTokenError } = require("jsonwebtoken");


let handleDuplicateEmailError = (err, res) => {
    res.status(400).json({ "DuplicateEmailError": err.message });
}

let handleUnauthorizedError = (err, res) => {
    res.status(401).json({ "UnauthorizedError": err.message })
}
let handleUserDataError = (err, res) => {
    res.status(400).json({ "UserDataError": err.message })
}
let handleUserSessionError = (err, res) => {
    res.status(400).json({ "UserSessionError": err.message })
}
let handleNoTokenError = (err, res) => {
    res.status(400).json({ "NoTokenError": err.message })
}

let handleInvalidTokenError = (err, res) => {
    res.status(403).json({ "InvalidTokenError": err.message })
}

let handleRessourceNotFoundError = (err, res) => {
    res.status(404).json({ "RessourceNotFoundError": err.message })
}



module.exports = (err, req, res, next) => {

    if (err instanceof DuplicateEmailError) {
        console.log("duplicate email error triggered")
        handleDuplicateEmailError(err, res)
    }


    else if (err instanceof UnauthorizedError) handleUnauthorizedError(err, res)

    else if (err instanceof UserDataError) handleUserDataError(err, res)

    else if (err instanceof UserSessionError) handleUserSessionError(err, res)

    else if (err instanceof NoTokenError) handleNoTokenError(err, res)

    else if (err instanceof InvalidTokenError) handleInvalidTokenError(err, res)

    else if (err instanceof RessourceNotFoundError) handleRessourceNotFoundError(err, res)

    else if (err instanceof JsonWebTokenError) {
        res.status(403).json({ "jwttoken error": err });
    }
    else {
        res.status(400).json({ "Unhadled error": err });
    }
}
