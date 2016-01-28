var dbHelper = require('../helpers/db-helper.js');
var logHelper = require('../helpers/log-helper.js');
var Q = require('../../node_modules/q/q.js');
var mongoose = require('mongoose');

var forumRepository = function() {
    var COLLECTION_NAME_FORUM = 'Forum';
    var COLLECTION_NAME_THREAD = 'Thread';
    var COLLECTION_NAME_POST = 'Post';
    
    // ########################################
    // ## Defining the mongoose entities.
    // ## [MB]
    // ########################################
    var forumSchema = mongoose.Schema({
        parentId: mongoose.mongo.ObjectID,
        label: String,
        name: String, /// <--- for url routing
        public: Boolean
    });
    var Forum = mongoose.model(COLLECTION_NAME_FORUM, forumSchema);
    
    var threadSchema = mongoose.Schema({
        forumId: mongoose.mongo.ObjectID,
        author: String,
        lastEdited: Date,
        deleted: Boolean
    });
    var Thread = mongoose.model(COLLECTION_NAME_THREAD, threadSchema);
    
    var postSchema = mongoose.Schema({
        threadId: mongoose.mongo.ObjectID,
        authorId: mongoose.mongo.ObjectID,
        title: String,
        content: String,
        spam: Boolean,
        reportCount: Number,
        updatedAt: Date,
        insertedAt: Date
    });
    var Post = mongoose.model(COLLECTION_NAME_POST, postSchema);
    
    
    // ########################################
    // ## Defining the actions
    // ## [MB]
    // ########################################
    var getForumListByParent = function(parentForumId) { }
    
    var getThreadListByParent = function(parentForumId) { }
    
    var createForum = function(forum) { }
    
    var setForumVisibility = function(forumId, visibility) { }
    
    var createThread = function(thread) { }
    
    var deleteThread = function(threadId) { }
    
    var getPostsByThread = function(threadId) { }
    
    var createPost = function(post) { }
    
    var deletePost = function(postId) { }
    
    var reportPost = function(postId) { }
    
    var markPostAsSpam = function(postId) { }
    
    
    
    
    var createEntry = function(newEntry) {
        // var deferredCreateEntry = Q.defer();
        // 
        // dbHelper.getConnection().then(function(connection) {
        //     newEntry.save(function (err, newEntry) {
        //         if (err) {
        //             logHelper.logError(err);
        //         }
        //         
        //         //logHelper.logInfo('Inserted GuestBookEntry.');
        //         deferredCreateEntry.resolve(newEntry);
        //     });
        // });
        // 
        // return deferredCreateEntry.promise;
    };
    
    var list = function() {
        // var deferredList = Q.defer();
        // 
        // dbHelper.getConnection().then(function(connection) {
        //     GuestBookEntry.find().sort({ insertedAt: -1 }).exec(function (err, loadedEntries) {
        //         if (err) {
        //             logHelper.logError(err);
        //         }
        //         
        //         //logHelper.logInfo('Loaded GuestBookEntry.');
        //         deferredList.resolve(loadedEntries);
        //     });
        // });
        // 
        // return deferredList.promise;
    }
  
    return {
        // createEntry: createEntry,
        // list: list,
        // 
        // // Model
        // GuestBookEntry: GuestBookEntry
    };
}();

module.exports = forumRepository;