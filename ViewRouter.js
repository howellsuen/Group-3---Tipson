const express = require('express');
const passport = require('passport');
const isLoggedIn = require('./utils/guard').isLoggedIn;
const expressSession = require('express-session');

module.exports = class ViewRouter {
    // remember to put back isLoggedIn,
    router() {
        const router = express.Router();
        router.get('/', (req, res) => res.render("index3"));
        router.get('/home', isLoggedIn, (req, res) => res.render("home3"));
        router.get('/ranking', isLoggedIn, (req, res) => res.render("ranking3"));
        router.get('/search', isLoggedIn, (req, res) => res.render("search3"));
        router.get('/profile', isLoggedIn, (req, res) => res.render("profile3"));
        router.get('/best', isLoggedIn, (req, res) => res.render("bestTipster3"));
        router.get('/worst', isLoggedIn, (req, res) => res.render("worstTipster3"));
        router.get('/history', isLoggedIn, (req, res) => res.render("history3"));

        // auth with facebook
        router.get('/auth/facebook',
            passport.authenticate('facebook', {
                scope: ['user_location', 'email']
            })
        );

        // callback route for facebook to redirect to
        // handle control to passport to use code to grab profile info
        router.get('/auth/facebook/callback', passport.authenticate('facebook', {
            successRedirect: '/home',
            failureRedirect: '/',
            session: true
        }));

        // auth logout
        router.get('/logout', (req, res) => {
            // handle with passport
            req.logout();
            // expressSession.clear();
            res.redirect('/');
        });

        return router;
    }
}