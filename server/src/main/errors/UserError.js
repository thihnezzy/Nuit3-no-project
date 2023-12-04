class UserSessionError extends Error {
    constructor(message) {
        super(message)
        this.name = "UserSessionError"
    }
}
class UserDataError extends Error {
    constructor(message) {
        super(message)
        this.name = "UserDataError"
    }
}


module.exports = {
    UserSessionError,
    UserDataError
}

