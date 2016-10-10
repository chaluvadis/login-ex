var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

router.get('/', function (req, res, next) {
    res.render('register', {
        status: ''
    });
});

router.post('/', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    req.checkBody('email', 'email is empty').notEmpty();
    req.checkBody('email', 'email is not valud').isEmail();
    req.checkBody('password', 'Password is empty').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.reder('login', {
            status: 'invalid login',
            errors: errors
        });
    } else {

        var hash = bcrypt.hashSync(password, salt);

        mongoose.
        model('User').
        create({
            "email": email,
            "password": hash
        }, function (err, user) {
            if (err) {
                res.render('register', {
                    status: 'Registration failed'
                });
            } else {
                res.render('register', {
                    status: 'Registration Success',
                    status_class: 'status_success'
                });
            }
        })
    }
});

module.exports = router;