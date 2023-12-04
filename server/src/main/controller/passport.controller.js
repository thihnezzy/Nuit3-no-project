const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userDao = require("../repository/").userDAO
const jwt = require('jsonwebtoken')
const { GG_CLI_ID, GG_CLI_SECRET, JWT_SECRET } = process.env
passport.use(new GoogleStrategy({
    callbackURL: "http://localhost:8080/api/oauth2/redirect/google",
    clientID: GG_CLI_ID,
    clientSecret: GG_CLI_SECRET,
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            // console.log(profile)
            let passport_cb = null
            const googleEmail = profile.emails[0].value
            console.log(googleEmail)
            const existingUser = await userDao.findByEmail(googleEmail)
            if (existingUser) {
                if (existingUser.login === 'local') {
                    console.log("existing email")
                    const emailLocal = {
                        type: "existingEmailNotion",
                        content: { message: "this email is already registered" }
                    }
                    return done(null, emailLocal)
                }
                if (existingUser.login === 'google') {
                    const token = jwt.sign({ id: existingUser._id },
                        JWT_SECRET,
                        {
                            algorithm: "HS256",
                            expiresIn: 86400
                        });
                    const passportJwt = {
                        type: "jwttoken",
                        content: {
                            user: existingUser._id,
                            token: token,
                            role: 'user'
                        }
                    }
                    return done(null, passportJwt)
                }
            }
            const user = userDao.create(googleEmail, null, "google")
            const defaultRole = await userDao.findRole("user")
            if (!defaultRole || defaultRole.length === 0) {
                throw new UserError.UserDataError("CreateUser: Role findOne error")
            }
            user.role = defaultRole
            await userDao.save(user)
            const token = jwt.sign({ id: user._id },
                JWT_SECRET,
                {
                    algorithm: "HS256",
                    expiresIn: 86400
                });
            const passportJwt = {
                type: "jwttoken",
                content: {
                    user: user._id,
                    token: token,
                    role: 'user'
                }
            }
            return done(null, passportJwt)
        } catch (err) {
            const error = {
                type: "error",
                content: err
            }
            console.log(error)
            return done(null, error)
        }
    }),
);
//For session use

passport.serializeUser((user, done) => {
    if (user) return done(null, user)
    else return done(null, false)
})
passport.deserializeUser((id, done) => {
    if (user) return done(null, user)
    else return done(null, false)
})

module.exports = passport;