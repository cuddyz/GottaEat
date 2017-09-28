var express = require('express');
var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');

var sslOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
    passphrase: 'gottaeat'
};

var app = express();

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + "/public"));
app.use('/modules', express.static(__dirname + '/node_modules'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
   res.render('index');
});

http.createServer(app).listen(port);
https.createServer(sslOptions, app).listen(8443)
