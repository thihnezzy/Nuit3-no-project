class DuplicateEmailError extends Error {
    constructor(message) {
        super(message)
        this.name = "DuplicateEmailError"
    }
}


module.exports = DuplicateEmailError