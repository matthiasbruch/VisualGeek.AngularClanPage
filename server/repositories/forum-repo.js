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
        forumId: String,
        parentId: String,
        label: String,
        name: String, /// <--- for url routing
        description: String,
        sortIdx: Number,
        private: Boolean
    });
    var Forum = mongoose.model(COLLECTION_NAME_FORUM, forumSchema);
    
    var threadSchema = mongoose.Schema({
        threadId: String,
        forumId: String,
        authorId: String,
        label: String,
        name: String, /// <--- for url routing
        lastEdited: Date,
        deleted: Boolean
    });
    var Thread = mongoose.model(COLLECTION_NAME_THREAD, threadSchema);
    
    var postSchema = mongoose.Schema({
        postId: String,
        threadId: String,
        authorId: String,
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
    var getForumListByParent = function(parentForumId, includePrivate) {
        var deferredList = Q.defer();
        
        dbHelper.getConnection().then(function(connection) {
            var searchPattern = {
                parentId: parentForumId || null
            };
            
            if (includePrivate !== true) {
                searchPattern.private = true;
            }
            
            Forum.find(searchPattern).sort({ sortIdx: 1 }).exec(function (err, loadedEntries) {
                if (err) {
                    logHelper.logError(err);
                }
                
                deferredList.resolve(loadedEntries);
            });
        });
        
        return deferredList.promise;
    }
    
    var getThreadListByParent = function(parentForumId) {
        
        var deferredList = Q.defer();
        
        dbHelper.getConnection().then(function(connection) {
            var searchPattern = {
                forumId: parentForumId,
                deleted: false
            };
            
            Thread.find(searchPattern).sort({ lastEdited: -1 }).exec(function (err, loadedEntries) {
                if (err) {
                    logHelper.logError(err);
                }
                
                deferredList.resolve(loadedEntries);
            });
        });
        
        return deferredList.promise;
    }
    
    var storeForum = function(forum) {
        
        var deferredCreateEntry = Q.defer();
        
        dbHelper.getConnection().then(function(connection) {
            forum.save(function (err, newEntry) {
                if (err) {
                    logHelper.logError(err);
                }
                
                deferredCreateEntry.resolve(newEntry);
            });
        });
        
        return deferredCreateEntry.promise;
    }
    
    var setForumVisibility = function(forumId, visible) {
        var deferredCreateEntry = Q.defer();
        
        var forum = getForumById(forumId);
        
        if (forum) {
            forum.private = !visible;
            
            storeForum(forum);
            
            deferredCreateEntry.resolve(forum);
        }
        
        return deferredCreateEntry.promise;
    }
    
    var storeThread = function(thread) {
        var deferredCreateEntry = Q.defer();
        
        dbHelper.getConnection().then(function(connection) {
            thread.save(function (err, newEntry) {
                if (err) {
                    logHelper.logError(err);
                }
                
                deferredCreateEntry.resolve(newEntry);
            });
        });
        
        return deferredCreateEntry.promise;
    }
    
    var deleteThread = function(threadId) {
        var deferredCreateEntry = Q.defer();
        
        var thread = getThreadById(threadId);
        
        if (thread) {
            thread.deleted = true;
            
            storeThread(thread);
            
            deferredCreateEntry.resolve(thread);
        }
        
        return deferredCreateEntry.promise;
    }
    
    var getPostsByThread = function(threadId) {
        var deferredList = Q.defer();
        
        dbHelper.getConnection().then(function(connection) {
            var searchPattern = {
                threadId: threadId,
                spam: {$ne: true}
            };
            
            Post.find(searchPattern).sort({ insertedAt: -1 }).exec(function (err, loadedEntries) {
                if (err) {
                    logHelper.logError(err);
                }
                
                deferredList.resolve(loadedEntries);
            });
        });
        
        return deferredList.promise;
    }
    
    var storePost = function(post) {
        var deferredCreateEntry = Q.defer();
        
        dbHelper.getConnection().then(function(connection) {
            post.save(function (err, newEntry) {
                if (err) {
                    logHelper.logError(err);
                }
                
                deferredCreateEntry.resolve(newEntry);
            });
        });
        
        return deferredCreateEntry.promise;
    }
    
    var deletePost = function(postId) {
        var deferredDeletion = Q.defer();
        
        dbHelper.getConnection().then(function(connection) {
            
            Post.find({ postId: postId }).exec(function (err, loadedEntries) {
                if (err) {
                    logHelper.logError(err);
                }
                
                deferredDeletion.resolve();
            });
        });
        
        return deferredDeletion.promise;
    }
    
    var reportPost = function(postId) {
        var deferredCreateEntry = Q.defer();
        
        var post = getPostById(postId);
        
        if (post) {
            post.reportCount++;
            
            storePost(post);
            
            deferredCreateEntry.resolve(post);
        }
        
        return deferredCreateEntry.promise;
    }
    
    var markPostAsSpam = function(postId) {
        var deferredCreateEntry = Q.defer();
        
        var post = getPostById(postId);
        
        if (post) {
            post.spam = true;
            
            storePost(post);
            
            deferredCreateEntry.resolve(post);
        }
        
        return deferredCreateEntry.promise;
    }
    
    var getForumById = function (forumId) {
        var deferredDeletion = Q.defer();
        
        dbHelper.getConnection().then(function(connection) {
            
            Forum.findOne({ forumId: forumId }).exec(function (err, forum) {
                if (err) {
                    logHelper.logError(err);
                }
                
                deferredDeletion.resolve(forum);
            });
        });
        
        return deferredDeletion.promise;
    }
    
    var getThreadById = function(threadId) {
        var deferredDeletion = Q.defer();
        
        dbHelper.getConnection().then(function(connection) {
            
            Thread.findOne({ threadId: threadId }).exec(function (err, thread) {
                if (err) {
                    logHelper.logError(err);
                }
                
                deferredDeletion.resolve(thread);
            });
        });
        
        return deferredDeletion.promise;
    }
    
    var getPostById = function(postId) {
        var deferredDeletion = Q.defer();
        
        dbHelper.getConnection().then(function(connection) {
            
            Post.findOne({ postId: postId }).exec(function (err, post) {
                if (err) {
                    logHelper.logError(err);
                }
                
                deferredDeletion.resolve(post);
            });
        });
        
        return deferredDeletion.promise;
    }
    
    
    return {
        getForumListByParent: getForumListByParent,
        getThreadListByParent: getThreadListByParent,
        storeForum: storeForum,
        setForumVisibility: setForumVisibility,
        storeThread: storeThread,
        deleteThread: deleteThread,
        getPostsByThread: getPostsByThread,
        storePost: storePost,
        deletePost: deletePost,
        reportPost: reportPost,
        markPostAsSpam: markPostAsSpam,
        getForumById: getForumById,
        getThreadById: getThreadById,
        getPostById: getPostById,
        
        // Model
        Forum: Forum,
        Thread: Thread,
        Post: Post   
    };
}();

module.exports = forumRepository;