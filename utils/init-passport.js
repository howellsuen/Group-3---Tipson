const passport = require('passport');

module.exports = (app, knex) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        console.log('serializeUser: ' + user.id)
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

    require('./strategies/facebook-strategy')(passport, knex);
};