/// <reference path="../../../ext/definitions/jquery" />
System.register(['angular2/core', './forum-list', './forum-thread-list', './forum-thread-content'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var core_1, forum_list_1, forum_thread_list_1, forum_thread_content_1;
    var ForumComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forum_list_1_1) {
                forum_list_1 = forum_list_1_1;
            },
            function (forum_thread_list_1_1) {
                forum_thread_list_1 = forum_thread_list_1_1;
            },
            function (forum_thread_content_1_1) {
                forum_thread_content_1 = forum_thread_content_1_1;
            }],
        execute: function() {
            ForumComponent = (function () {
                function ForumComponent() {
                    this.listType = {
                        ForumsAndThreads: true,
                        ThreadContent: true
                    };
                }
                ForumComponent = __decorate([
                    core_1.Component({
                        selector: 'forum',
                        templateUrl: './app/components/forum/forum.html',
                        directives: [forum_list_1.ForumListComponent, forum_thread_list_1.ForumThreadListComponent, forum_thread_content_1.ForumThreadContentComponent]
                    })
                ], ForumComponent);
                return ForumComponent;
            })();
            exports_1("ForumComponent", ForumComponent);
        }
    }
});
//# sourceMappingURL=forum.js.map