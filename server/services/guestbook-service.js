var dbHelper = require('../helpers/db-helper.js');

var guestbookService = function() {
    var COLLECTION_NAME_GUESTBOOK = 'Guestbook';
    
    var createEntry = function(req, resp) {
        dbHelper.insertOne(COLLECTION_NAME_GUESTBOOK, {
            message: 'This is a test',
            title: 'Something above',
            author: 'Name of glorious person.',
            approved: false,
            insertedAt: new Date()
        });

        resp.send('{ success: true }');
    };
    
    var list = function(req, resp) {
        var loadedData = dbHelper.find(COLLECTION_NAME_GUESTBOOK, {}).then(function(loadedData) {
            
            resp.json(loadedData);
        })

    }
  
    return {
        registerRoutes: function(app) {
            app.get('/services/guestbook/list', list);
            app.get('/services/guestbook/createEntry', createEntry);
        }  
    };
}();

module.exports = guestbookService;