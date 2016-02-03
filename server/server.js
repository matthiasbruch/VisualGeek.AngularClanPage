var express = require('express');
var bodyParser = require('body-parser');

var folderSeperator = '\\';
var workingFolderParts = __dirname.split(folderSeperator);
workingFolderParts.pop();
var workingFolder = workingFolderParts.join(folderSeperator) + folderSeperator;

var guestbookService = require('./services/guestbook-service.js');
var forumService = require('./services/forum-service.js');
var app = express();

app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

guestbookService.registerRoutes(app);
forumService.registerRoutes(app);

var port = 3000;

app.get('*', function(req, res) {
    res.sendFile(workingFolder + 'index.html');
});

app.listen(port, function () {
    console.log('Clanpage started listening on port ' + port + '.');
})