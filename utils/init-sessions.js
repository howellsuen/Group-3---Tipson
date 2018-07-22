const expressSession = require('express-session');

module.exports = (app) => {
    const settings = {
        secret: "supersecret",
        resave: false,
        saveUninitialized: true,
        cookie: {
            "path": '/',
            "httpOnly": true,
            "secure": true,
            "maxAge": 7 * 24 * 60 * 60 * 1000 // 7 days
        }
    }
    app.set('trust proxy', 1) // trust first proxy
    app.use(expressSession(settings));
}