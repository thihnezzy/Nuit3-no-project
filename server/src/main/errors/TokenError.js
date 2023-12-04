class NoTokenError extends Error {
    constructor(message) {
        super(message)
        this.name = "NoTokenError"

    }
}


class InvalidTokenError extends Error {
    constructor(message) {
        super(message)
        this.name = "InvalidTokenError"

    }
}


module.exports = {
    NoTokenError,
    InvalidTokenError
}
