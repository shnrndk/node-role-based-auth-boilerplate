const User = require('../models/User')
const { SECRET } = require('../config/index')
let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
}

const checkToken = (passport) => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        await User.findById(jwt_payload.user_id)
            .then(user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }).catch(err => {
                return done(err, false);
            });
    }))
}

module.exports = checkToken
