var dbHelper = require('../helpers/db-helper.js');
var fs = require('fs');

var guestbookService = function() {
    var COLLECTION_NAME_GUESTBOOK = 'Guestbook';
    
    var createEntry = function(req, resp) {
        
        dbHelper.insertOne(COLLECTION_NAME_GUESTBOOK, {
            message: req.body.message,
            title: req.body.title,
            author: req.body.author,
            approved: false,
            insertedAt: new Date()
        }).then(function() {
            resp.send({ success: true });  
            resp.end();
        })
    };
    
    var list = function(req, resp) {
        var loadedData = dbHelper.find(COLLECTION_NAME_GUESTBOOK, {}, { insertedAt: -1 }).then(function(loadedData) {
            
            resp.json(loadedData);
            resp.end();
        })

    }
  
    return {
        registerRoutes: function(app) {
            app.get('/services/guestbook/list', list);
            app.post('/services/guestbook/createEntry', createEntry);
        }
    };
}();

module.exports = guestbookService;