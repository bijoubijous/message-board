var express = require('express'),
    router = express.Router(),
    Letter = require('../models/letter'),
    request = require('request');
var middleware = require('../middleware');

//root route lmao
router.get('/', middleware.isLoggedIn, function(req, res){
    if(req.isAuthenticated()){
        Letter.find({recipient:{username: req.user.username}} , function(err, allLetters){
            if(err){
                console.log(err);
            }
            else{
                console.log(allLetters);
                res.render('letters/index',{letters:allLetters});
            };
        });
    }else{
        res.redirect('/login');
    }
 });

router.get('/new', middleware.isLoggedIn, function(req, res){
    res.render('letters/new');
});

router.get('/:id', middleware.isLoggedIn, function(req, res){
    //find specific letter
    Letter.findById(req.params.id).exec(function(err, foundLetter){
        if(err){
            console.log(err);
        }else{
            //display specific letter
            console.log(foundLetter);
            res.render('letters/show', {letter:foundLetter});
        }
    })
});

router.post('/', middleware.isLoggedIn, function(req, res){
    //get data from form and add to letters array
    var date = req.body.date;
    var content = req.body.cont;
    var recipient = {
            username: req.body.recipient
        };
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newLetter = {date: date, content: content, recipient: recipient, author: author};
    //create new letter and save to the DB
    Letter.create(newLetter, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
            //redirect back to the display
            res.redirect('/letters');
        };
    });
});

module.exports = router;