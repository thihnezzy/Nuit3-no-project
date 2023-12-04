class UndefinedRoleError extends Error {
    constructor(message) {
        super(message)
        this.name = " UndefinedRoleError"
    }
}


module.exports = UndefinedRoleError

