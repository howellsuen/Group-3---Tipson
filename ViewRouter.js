const express = require('express');
const passport = require('passport');
const isLoggedIn = require('./utils/guard').isLoggedIn;

module.exports = class ViewRouter {
    // remember to put back is isLoggedIn,
    router() {
        const router = express.Router();
        router.get('/', (req, res) => res.render("index3"));
        router.get('/home', (req, res) => res.render("home3"));
        router.get('/ranking', (req, res) => res.render("ranking3"));
        router.get('/search', (req, res) => res.render("search3"));
        router.get('/profile', (req, res) => res.render("profile3"));
        router.get('/best', (req, res) => res.render("bestTipster3"));
        router.get('/worst', (req, res) => res.render("worstTipster3"));
        router.get('/history', (req, res) => res.render("history3"));

        // auth with facebook
        router.get('/auth/facebook',
            passport.authenticate('facebook', {
                scope: ['user_location', 'email']
            })
        );

        // callback route for facebook to redirect to
        // hand control to passport to use code to grab profile info
        router.get('/auth/facebook/callback', passport.authenticate('facebook', {
            successRedirect: '/home',
            failureRedirect: '/',
            session: true
        }));

        // auth logout
        router.get('/logout', (req, res) => {
            // handle with passport
            res.send('logging out');
        });

        return router;
    }
}