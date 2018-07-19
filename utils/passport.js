const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (app, knex) => {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use('facebook', new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: `/auth/facebook/callback`
    }, async(accessToken, refreshToken, profile, done) => {
        try {
            let usersResult = await knex('users').where({
                facebookId: profile.id
            });
            if (usersResult.length == 0) {
                let user = await knex('users').insert({
                    name: profile.displayName,
                    facebookId: profile.id,
                    accessToken: accessToken,
                    profile_picture: picture
                })
                return done(null, user)
            } else {
                return done(null, usersResult[0]);
            }
        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async(id, done) => {
        let users = await knex('users').where({
            id: id
        });
        if (users.length == 0) {
            return done(new Error(`Wrong user id ${id}`));
        }
        let user = users[0];
        return done(null, user);
    });
};