const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys');

passport.use(
    new FacebookStrategy({
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret,
        callbackURL: "/auth/facebook/callback"
     }, (accessToken, refreshToken, profile, done) => {
        console.log('passport callback function fired:');
        console.log(profile);
    })
);
