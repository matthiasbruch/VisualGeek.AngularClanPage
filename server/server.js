var express = require('express');
var bodyParser = require('body-parser');

var guestbookService = require('./services/guestbook-service.js');
var app = express();

app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

guestbookService.registerRoutes(app);

var port = 3000;


app.get('*', function(req, res) {
    res.sendfile('./index.html');
});

app.listen(port, function () {
    console.log('Clanpage started listening on port ' + port + '.');
})