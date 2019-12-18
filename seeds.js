var mongoose = require('mongoose');
var Letter = require ('./models/letter');
var User = require('./models/user')

var letterData = [
    {
        date: new Date('2019-12-10'),
        content: 'ooga booga',
        author:{
            username: 'enfera'
        },
        recipient: {
            username: 'crtaig'
        }
    },
    {
        date: new Date('2019-12-13'),
        content: 'ooga booga',
        author:{
            username: 'enfera'
        },
        recipient: {
            username: 'nico'
        }
    },
    {
        date: new Date('2019-12-13'),
        content: 'ok',
        author:{
            username: 'enfera'
        },
        recipient: {
            username: 'enfera'
        }
    }
];

var userData = [
    {
        username: 'crtaig',
        password: 'backAtThePizzaHut666'
    },
    {
        username: 'nico',
        password: 'backAtTheTacoBell666'
    },
    {
        username: 'enfera',
        password: 'iMadeThislmao'
    }
];

function seedDB(){
    //remove all letters
    Letter.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log('removed letters.');
            //add in default letters
            letterData.forEach(function(seed){
                Letter.create(seed, function(err, data){
                    if(err){
                        console.log(err);
                    }else{
                        console.log('added a letter');
                    }
                })
            });
            User.deleteMany({}, function (err){
                if(err){
                    console.log(err);
                }else{
                    console.log('deleted users');
                    userData.forEach(function(seed){
                        User.create(seed, function(err, data){
                            if(err){
                                console.log(err);
                            }else{
                                console.log('added a user');
                            };
                        })
                    })
                }
            }
        )}
    });
}

module.exports = seedDB;