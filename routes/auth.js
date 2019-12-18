var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user');

//root route lmao
router.get('/', function(req, res){
    res.render('index');
});

//show login

router.get('/login', function(req, res){
    res.render('login');
});

//login logic

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/letters',
        failureRedirect:'/login'
    }), function(req, res){
});

//logout route
router.get('/logout', function (req, res){
    req.logout();
    res.redirect('/');
});

//middleware

module.exports = router;
