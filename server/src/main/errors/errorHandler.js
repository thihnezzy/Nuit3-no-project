const DuplicateEmailError = require("./DuplicateEmailError");
const UnauthorizedError = require("./UnauthorizedError")
const NoTokenError = require("./TokenError").NoTokenError
const InvalidTokenError = require("./TokenError").InvalidTokenError
const UserDataError = require("./UserError").UserDataError
const UserSessionError = require("./UserError").UserSessionError
const RessourceNotFoundError = require("./RessourceNotFoundError");
const BadCredentialsError = require("./BadCredentialsError")
const { JsonWebTokenError } = require("jsonwebtoken");

let handleDuplicateEmailError = (err, res) => {
    res.status(409).json({ error: "Conflict", message: err.message });
}

let handleUnauthorizedError = (err, res) => {
    res.status(401).json({ error: "Unauthorized", message: err.message });
}

let handleUserDataError = (err, res) => {
    res.status(400).json({ error: "Bad Request", message: err.message });
}

let handleUserSessionError = (err, res) => {
    res.status(400).json({ error: "Bad Request", message: err.message });
}

let handleNoTokenError = (err, res) => {
    res.status(401).json({ error: "Unauthorized", message: err.message });
}

let handleInvalidTokenError = (err, res) => {
    res.status(403).json({ error: "Forbidden", message: err.message });
}

let handleResourceNotFoundError = (err, res) => {
    res.status(404).json({ error: "Not Found", message: err.message });
}

let handleBadCredentialsError = (err, res) => {
    res.status(401).json({ error: "Unauthorized", message: err.message });
}

let handleJsonWebTokenError = (err, res) => {
    res.status(403).json({ "jwt token error": err })
}


module.exports = (err, req, res, next) => {
    if (err instanceof DuplicateEmailError) handleDuplicateEmailError(err, res)

    else if (err instanceof UnauthorizedError) handleUnauthorizedError(err, res)

    else if (err instanceof UserDataError) handleUserDataError(err, res)

    else if (err instanceof UserSessionError) handleUserSessionError(err, res)

    else if (err instanceof NoTokenError) handleNoTokenError(err, res)

    else if (err instanceof InvalidTokenError) handleInvalidTokenError(err, res)

    else if (err instanceof RessourceNotFoundError) handleResourceNotFoundError(err, res)

    else if (err instanceof JsonWebTokenError) handleJsonWebTokenError(err, res)

    else if (err instanceof BadCredentialsError) handleBadCredentialsError(err, res)

    else {
        res.status(500).json({ "Internal Error": err });
    }
}
