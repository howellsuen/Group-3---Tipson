const cookieSession = require('cookie-session');

module.exports = (app)=>{
    app.use(cookieSession({
        name: 'session',
        secret: 'supersecret',
        // Cookie Options
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }))
}