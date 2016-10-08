var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', function(req, res, next){
    res.redirect('login', {status:''});
});

router.post('/', function(req, res, next){
    var email = req.body.email;
    var password = req.body.password;

    req.checkBody('email', 'Email is empty').notEmpty();
    req.checkBody('email', 'Enter a valid email').isEmail();
    
    req.checkBody('password', 'Password is empty').notEmpty();

    var errors = req.validationErrors();

    console.log(next);

    if(errors) {
            res.redirect('login', {status: 'invalid login', errors: errors});
    } else {
        mongoose.model('User').find({
            email: email,
            password: password
            }, function(err, user){
            if(err){
                res.redirect('login');
            } else {
                res.redirect('home');
            }
        });
        res.redirect('home');
    }
});

module.exports = router;