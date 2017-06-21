var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + "/public"));
app.use('/modules', express.static(__dirname + '/node_modules'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
   res.render('index');
});

app.listen(port);
