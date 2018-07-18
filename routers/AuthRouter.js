const router = require('express').Router();
const passport = require('passport');

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    res.send('logging out');
});

// // auth with Wechat
// router.get('/wechat', (req, res) => {
//     // handle with passport
//     res.send('logging in with wechat');
// });


// auth with facebook
router.get('/facebook',
    passport.authenticate('facebook', { scope: ['user_location', 'email'] })
);

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/',
    session: false
}));

module.exports = router;