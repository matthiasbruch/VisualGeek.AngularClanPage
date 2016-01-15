var express = require('express');
var guestbookService = require('./services/guestbook-service.js');
var app = express();

app.use(express.static('./'));

guestbookService.registerRoutes(app);

var port = 3000;

app.listen(port, function () {
    console.log('Clanpage started listening on port ' + port + '.');
})