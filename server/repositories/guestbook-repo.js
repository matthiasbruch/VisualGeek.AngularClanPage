var dbHelper = require('../helpers/db-helper.js');
var logHelper = require('../helpers/log-helper.js');
var Q = require('../../node_modules/q/q.js');
var mongoose = require('mongoose');

var guestbookRepository = function() {
    var COLLECTION_NAME_GUESTBOOK = 'Guestbook';
    
    // Defining the mongoose entities.
    // [MB]
    var guestBookEntrySchema = mongoose.Schema({
        message: String,
        title: String,
        author: String,
        approved: Boolean,
        insertedAt: Date
    });
    var GuestBookEntry = mongoose.model(COLLECTION_NAME_GUESTBOOK, guestBookEntrySchema);
   
    
    var createEntry = function(newEntry) {
        var deferredCreateEntry = Q.defer();
        
        dbHelper.getConnection().then(function(connection) {
            newEntry.save(function (err, newEntry) {
                if (err) {
                    logHelper.logError(err);
                }
                
                //logHelper.logInfo('Inserted GuestBookEntry.');
                deferredCreateEntry.resolve(newEntry);
            });
        });
        
        return deferredCreateEntry.promise;
    };
    
    var list = function() {
        var deferredList = Q.defer();
        
        dbHelper.getConnection().then(function(connection) {
            GuestBookEntry.find().sort({ insertedAt: -1 }).exec(function (err, loadedEntries) {
                if (err) {
                    logHelper.logError(err);
                }
                
                //logHelper.logInfo('Loaded GuestBookEntry.');
                deferredList.resolve(loadedEntries);
            });
        });
        
        return deferredList.promise;
    }
  
    return {
        createEntry: createEntry,
        list: list,
        
        // Model
        GuestBookEntry: GuestBookEntry
    };
}();

module.exports = guestbookRepository;