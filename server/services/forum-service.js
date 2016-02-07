var forumRepo = require('../repositories/forum-repo.js');
var logHelper = require('../helpers/log-helper.js');
var uuid = require('uuid');

var forumService = function() {
    var BASE_FORUM_ID = 'base';
    
    var getForumListByParent = function(req, resp) {
        
        var parentForumId = req.query.parentForumId || BASE_FORUM_ID;
        var includePrivate = req.query.includePrivate;
        
        forumRepo.getForumListByParent(parentForumId, includePrivate).then(function(listOfForums) {
            resp.json(listOfForums);
            resp.end();
        });
        
    };
    
    var getThreadListByParent = function(req, resp) {
        
        var parentForumId = req.query.parentForumId || BASE_FORUM_ID;
        console.log('by thread:' + parentForumId);
        forumRepo.getThreadListByParent(parentForumId).then(function(listOfThreads) {
            resp.json(listOfThreads);
            resp.end();
        });

    };
    
    var storeForum = function(req, resp) {
        
        forumRepo.storeForum(new forumRepo.Forum({
            forumId: req.body.forumId || uuid.v4(),
            parentId: req.body.parentId || BASE_FORUM_ID,
            label: req.body.label,
            name: req.body.name,
            description: req.body.description,
            sortIdx: req.body.sortIdx || 9999,
            private: (req.body.private !== undefined) ? req.body.private : true
        })).then(function() {
            resp.json({ success: true });
            resp.end();
        });
        
    };
    
    var setForumVisibility = function(req, resp) {

        if (req.body.forumId && (req.body.visible !== undefined)) {
            forumRepo.setForumVisibility(req.body.forumId, req.body.visible).then(function() {
                resp.json({ success: true });
                resp.end();
            });
        }
        
    };
    
    var storeThread = function(req, resp) {

        forumRepo.storeThread(new forumRepo.Thread({
            threadId: req.body.threadId || uuid.v4(),
            forumId: req.body.forumId || BASE_FORUM_ID,
            authorId: uuid.v4(),
            label: req.body.label,
            name: req.body.name,
            lastEdited: new Date(),
            deleted: false
        })).then(function() {
            resp.json({ success: true });
            resp.end();
        });
        
    };
    
    var deleteThread = function(req, resp) {
        
        if (req.body.threadId) {
            forumRepo.deleteThread(req.body.threadId).then(function() {
                resp.json({ success: true });
                resp.end();
            });
        }
        
    };
    
    var getPostsByThread = function(req, resp) {

        forumRepo.getPostsByThread(req.query.threadId || BASE_FORUM_ID).then(function(loadedThreads) {
            resp.json(loadedThreads);
            resp.end();
        });

    };
    
    var storePost = function(req, resp) {

        forumRepo.storePost(new forumRepo.Post({
            postId: req.body.postId || uuid.v4(),
            threadId: req.body.threadId || BASE_FORUM_ID,
            authorId: uuid.v4(),
            title: req.body.title,
            content: req.body.content,
            spam: false,
            reportCount: 0,
            updatedAt: new Date(),
            insertedAt: new Date()
        })).then(function() {
            resp.json({ success: true });
            resp.end();
        });

    };
    
    var deletePost = function(req, resp) {
                    
        if (req.body.postId) {
            forumRepo.deletePost(req.body.postId).then(function() {
                resp.json({ success: true });
                resp.end();
            });
        }
        
    };
    
    var reportPost = function(req, resp) {
                    
        if (req.body.postId) {
            forumRepo.reportPost(req.body.postId).then(function() {
                resp.json({ success: true });
                resp.end();
            });
        }
        
    };
    
    var markPostAsSpam = function(req, resp) {
                    
        if (req.body.postId) {
            forumRepo.markPostAsSpam(req.body.postId).then(function() {
                resp.json({ success: true });
                resp.end();
            });
        }

    };

    return {
        registerRoutes: function(app) {
            app.get('/services/forum/getForumListByParent', getForumListByParent);
            app.get('/services/forum/getThreadListByParent', getThreadListByParent);
            app.post('/services/forum/storeForum', storeForum);
            app.post('/services/forum/setForumVisibility', setForumVisibility);
            app.post('/services/forum/storeThread', storeThread);
            app.post('/services/forum/deleteThread', deleteThread);
            app.get('/services/forum/getPostsByThread', getPostsByThread);
            app.post('/services/forum/storePost', storePost);
            app.post('/services/forum/deletePost', deletePost);
            app.post('/services/forum/reportPost', reportPost);
            app.post('/services/forum/markPostAsSpam', markPostAsSpam);
        }
    };
}();

module.exports = forumService;