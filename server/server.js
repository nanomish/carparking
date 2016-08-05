/**
 * Created by mkushnir on 28/07/16.
 */

var express = require('express');
var path = require('path');
var publicPath = path.resolve(__dirname, '..', 'public');
var passport = require('passport');

var app = express();

var port = process.env.PORT || 7000;

// Define a middleware function to be used for every secured routes
var auth = function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401)
    }
    else {
        next();
    }
}; //- See more at: https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs

app.get('/admin', auth, function () {return {admin: 'adminvalue'};});

// route to test if the user is logged in or not
app.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});
// route to log in
app.post('/login', passport.authenticate('local'), function(req, res) {
    res.send(req.user);
});
// route to log out
app.post('/logout', function(req, res) {
    req.logOut(); res.send(200);
}); //- See more at: https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs

app.use(express.static(publicPath));

app.get('/car', function (req, res) {
    res.send('Car parking!');
});

app.get('/', function(req, res) {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/api/getobj', function(req, res) {
    res.send({'key': 'value'});
});

var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});