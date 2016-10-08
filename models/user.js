var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    createdAt: {type:Date, default: Date.now()}
});

mongoose.model('User', userSchema); 