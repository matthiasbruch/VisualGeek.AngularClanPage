var colors = require('colors');
var Q = require('../../node_modules/q/q.js');

var dbHelper = function() {
    // Todo: implement guestbook by: https://docs.mongodb.org/getting-started/node/insert/
    var getConnection = function(logic) {
        var MongoClient = require('mongodb').MongoClient;
        
        MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
            if (err) {
                console.log('###############################'.red);
                console.log('DB-Error'.red);
                console.log((err + '').red);
                console.log('###############################'.red);
            }
            else if (!db) {
                console.log('###############################'.yellow);
                console.log('DB connection could NOT be opened'.yellow);
                console.log('###############################'.yellow);
            }
            else {
                console.log("Connected correctly to server.".green);
                logic(err, db);
            }
        });
    };

    var find = function(collectionName, query, sortStatement) {
        var deferred = Q.defer();
        
        getConnection(function(err, db) {
            var result = [];

            var resultHandle = db.collection(collectionName).find(query).sort(sortStatement);
            resultHandle.each(function(err, doc) {
                if (doc != null) {
                    result.push(doc);
                }
                else {
                    deferred.resolve(result);
                    db.close();
                }
            });
            
            console.log(result);
            
            return result;
        });
        
        return deferred.promise;
    };
    
    // Inserting a single element to a collection.
    // [MB]
    var insertOne = function(collectionName, objectToInsert) {
        var deferred = Q.defer();
        
        getConnection(function(err, db) {
            db.collection(collectionName).insertOne(objectToInsert, function(err, result) {
                
                if (err) {
                    console.log(('Error while writing to db: ' + err).yellow);
                }
                else {
                    console.log('Inserted dataset.'.green);
                }
                
                db.close();
                
                deferred.resolve();
            });
        });
        
        return deferred.promise;
    };
    
    return {
        find: find,
        insertOne: insertOne
    };
}();

module.exports = dbHelper;