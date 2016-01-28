var guestbookRepo = require('../repositories/guestbook-repo.js');
var logHelper = require('../helpers/log-helper.js');

var guestbookService = function() {
    var createEntry = function(req, resp) {
        guestbookRepo.createEntry(new guestbookRepo.GuestBookEntry({
            message: req.body.message,
            title: req.body.title,
            author: req.body.author,
            approved: false,
            insertedAt: new Date()
        })).then(function() {
            resp.json({ success: true });
            resp.end();
        });
    };
    
    var list = function(req, resp) {
        guestbookRepo.list().then(function(loadedData) {
            resp.json(loadedData);
            resp.end();
        });
    }
  
    return {
        registerRoutes: function(app) {
            app.get('/services/guestbook/list', list);
            app.post('/services/guestbook/createEntry', createEntry);
        }
    };
}();

module.exports = guestbookService;