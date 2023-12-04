const express = require("express")
const router = express.Router()
const authController = require("../controller").authController
const roleAuth = require("../middleware/role.auth")
const passport = require('passport')



router.get("/oauth2/google", passport.authenticate('google', { session: true, scope: ['profile', 'email'] }))

router.get("/oauth2/redirect/google", passport.authenticate('google', { failureRedirect: '/' }), (req, res, next) => {

    if (req.user.type === 'error') {

        return next(req.user.content)
    }
    if (req.user.type === 'existingEmailNotion') {
        res.status(200).send(req.user.content.message)
    } else if (req.user.type === "jwttoken") {
        res.status(200).send(req.user.content)
    }
})
router.route("/auth/signup")
    .post(roleAuth.checkRolesExisted, authController.signUp)


router.route("/auth/signin")
    .post(authController.signIn)


module.exports = router