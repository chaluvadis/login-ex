var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

router.get('/', function(req, res, next){
    res.render('login', {status:''});
});

router.post('/', function(req, res, next){
    var email = req.body.email;
    var password = req.body.password;

    var session = req.session;

    req.checkBody('email', 'Email is empty').notEmpty();
    req.checkBody('email', 'Enter a valid email').isEmail();
    
    req.checkBody('password', 'Password is empty').notEmpty();

    var errors = req.validationErrors();

    console.log(req);

    if(errors) {
            res.reder('login', {status: 'invalid login', errors: errors});
    } else {

        var hash = bcrypt.hashSync(password, salt);

        mongoose.model('User').find({
            'email': email,
            'password': hash
            }, function(err, user){
            if(err){
                //res.render('error');
            } else {
                console.log(user);
                res.render('home');
            }
        });
    }
});

module.exports = router;