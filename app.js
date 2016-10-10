// load all required dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var validator = require('express-validator');

var session = require('express-session');

var helmet = require('helmet');

var bcrypt = require('bcryptjs');

var KEY = 'meet up example';

//passport js config
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//routes initialization
var login = require('./routes/login');
var register = require('./routes/register');
var home = require('./routes/home');
var error = require('./routes/error');

var db = require('./models/db');
var user = require('./models/user');

// set up server 
var app = express();

//helmet configuration
app.use(helmet());
//cross site scripting issues
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());

//views
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//static file configuration
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: KEY,
    cookie : {},
    resave: false
}));

//body-parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//express validator middle ware
app.use(validator());

//configure the routes
app.use('/', login);
app.use('/register', register);
app.use('/home', home);
app.use('/error', error);

app.set('PORT', (process.env.PORT||3000));

// run the server to listen req
app.listen(app.get('PORT'), function(){
    console.log('Server running at ' + app.get('PORT'));
});