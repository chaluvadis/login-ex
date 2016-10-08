var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', function(req, res, next){
    res.render('register', {status:''});
});

router.post('/', function(req, res, next){
    var email = req.body.email;
    var password = req.body.password;

    // var file = req.body.file;

    // var encode = base64.Encode(file, fs);

    req.checkBody('email', 'email is empty').notEmpty();
    req.checkBody('email', 'email is not valud').isEmail();

    mongoose.
    model('User').
    create({
        email: email,
        password: password,
        profile_pic: encode
    }, function(err, user){
        if(err) {
            res.render('register', {status: 'Registration failed'});
        } else {
            res.render('register', {status: 'Registration Success'});
        }
    })


    if(email!== '' && password!==''){
        res.render('login', {status: 'valid login'});
    } else {
    }
});

module.exports = router;