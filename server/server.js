var express = require('express');
var app = express();

app.use(express.static('./'));

app.get('/services/test', function (req, res) {
    
    // Todo: implement guestbook by: https://docs.mongodb.org/getting-started/node/insert/
    
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
        console.log("Connected correctly to server.");
                
        db.collection('restaurants').insertOne({
            "testobj" : {
                "name" : "mine ... of course",
                "message" : "something important i got to tell the world"
            }
        }, function(err, result) {
            console.log("Inserted a document into the restaurants collection.");
        });
        
        db.close();
    });
    
    res.send('{ success: true }');
});

var port = 3000;

app.listen(port, function () {
    console.log('Clanpage started listening on port ' + port + '.');
})