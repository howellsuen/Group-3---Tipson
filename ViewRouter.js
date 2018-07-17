const express = require('express');

module.exports = class ViewRouter{
    
    router(){
        const router = express.Router();
        router.get('/',(req,res)=>res.render("index"));
        router.get('/home',(req,res)=>res.render("home"));
        router.get('/ranking',(req,res)=>res.render("ranking"));
        router.get('/search',(req,res)=>res.render("search"));
        router.get('/profile',(req,res)=>res.render("profile"));
        router.get('/users',(req,res)=>res.render("users"));
        router.get('/groups',(req,res)=>res.render("groups"));
        
        
        return router;
    }
}