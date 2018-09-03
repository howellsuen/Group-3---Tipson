const passport = require('passport');
const passportJWT = require('passport-jwt');
const config = require('../utils/config')
const ExtractJwt = passportJWT.ExtractJwt;
require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV || 'development'
const knexFile = require('../knexfile')[NODE_ENV]
const knex = require('knex')(knexFile)

module.exports = function () {
    const strategy = new passportJWT.Strategy({
        secretOrKey: config.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }, async (payload, done) => {
        const user = await knex.select('user_id')
            .from('users')
            .where('user_id', payload.user_id)
        if (user.length !== 0) {
            return done(null, { user_id: user[0].user_id });
        } else {
            return done(new Error("User not found"), null);
        }
    });
    passport.use(strategy);

    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
}