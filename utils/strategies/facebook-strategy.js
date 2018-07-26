const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

module.exports = (passport, knex) => {
    passport.use('facebook', new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: `/auth/facebook/callback`,
        profileFields: ['id', 'name', 'picture.type(large)', 'emails', 'displayName', 'about', 'gender']
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
                        profile_picture: profile.photos[0].value
                    }).returning('id') // [1]

                return done(null, {
                    id: user[0]
                })
            } else {
                // console.log(profile);
                return done(null, usersResult[0]);
            }
        } catch (err) {
            return done(err);
        }
    }));
}