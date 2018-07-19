const expressSession = require('express-session');

module.exports = (app) => {
    const settings = {
        secret: "supersecret",
        resave: true,
        saveUninitialized: true,
        cookie: {
            "path": '/',
            "httpOnly": true,
            "secure": true,
            "maxAge": 24 * 60 * 60 * 1000 // 24 hours
        }
    }
    app.set('trust proxy', 1) // trust first proxy
    app.use(expressSession(settings));
}