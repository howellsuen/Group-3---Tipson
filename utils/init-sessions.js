const expressSession = require('express-session');
const cookieSession = require('cookie-session');

module.exports = (app) => {
    const settings = {
        secret: "supersecret",
        cookie: {
            "path": '/',
            "httpOnly": true,
            "secure": false,
            "maxAge": 24 * 60 * 60 * 1000 // 24 hours
        }
    }
    app.use(expressSession(settings));
}