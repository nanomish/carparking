/**
 * Created by mkushnir on 28/07/16.
 */

var express = require('express');
var path = require('path');
var publicPath = path.resolve(__dirname, '..', 'public');

var app = express();

var port = process.env.PORT || 7000;


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