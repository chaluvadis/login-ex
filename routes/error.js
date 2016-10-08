var express = require('express');
var router = express.Routers();

router.get('/error', function(req, res){
    res.redirect('error');
});

module.exports = router;