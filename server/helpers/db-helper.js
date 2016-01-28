var colors = require('colors');
var Q = require('../../node_modules/q/q.js');
var mongoose = require('mongoose');

var dbHelper = function() {
    
    var connection = null;
    
    // Todo: implement guestbook by: https://docs.mongodb.org/getting-started/node/insert/
    var getConnection = function() {
        var deferredConnection = Q.defer();
        
        if (connection) {
            deferredConnection.resolve(connection);
        }
        else {
            mongoose.connect('mongodb://localhost:27017/ClanPage');
            connection = mongoose.connection;
            
            connection.on('error', function(err) {
                if (err) {
                    console.log('###############################'.red);
                    console.log('DB-Error'.red);
                    console.log((err + '').red);
                    console.log('###############################'.red);
                }
                
                deferredConnection.resolve(null);
            });
            
            connection.once('open', function() {
                console.log('###############################'.green);
                console.log('DB connected'.green);
                console.log('###############################'.green);
                deferredConnection.resolve(connection);
            });
        }
        
        return deferredConnection.promise;
    };

    
    return {
        getConnection: getConnection
    };
}();

module.exports = dbHelper;