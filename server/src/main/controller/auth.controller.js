const authService = require("../service").authService



let signUp = async (req, res, next) => {
    try {
        // handle req 
        const userData = { ...req.body }

        // business logic
        const user = await authService.signUp(userData)

        // handle res
        res.status(201).send({ message: "signup success", user: { email: user.email, local: user.login } })
    } catch (err) {
        next(err)
    }
}

let signIn = async (req, res, next) => {
    try {
        const userData = { ...req.body, session: req.session }
        // const userSession = req.session
        const response = await authService.signIn(userData)

        res.status(200).send(response)
    } catch (err) {
        next(err)
    }
}
const authController = {
    signUp,
    signIn,
}

module.exports = authController