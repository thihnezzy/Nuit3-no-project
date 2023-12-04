class RessourceNotFoundError extends Error {
    constructor(message) {
        super(message)
        this.name = "RessourceNotFoundError"
    }
}

module.exports = RessourceNotFoundError