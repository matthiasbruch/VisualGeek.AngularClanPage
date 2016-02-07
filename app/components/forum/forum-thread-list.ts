/// <reference path="../../../ext/definitions/jquery" />

import {Component, Injector} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

@Component({
    selector: 'forum-thread-list',
    templateUrl: './app/components/forum/forum-thread-list.html'
})

export class ForumThreadListComponent {

    items: Thread[];
    forumId: string;

    constructor(private _router: Router, injector: Injector) {
        this.items = [];
                
        // Todo: Improve this ... worst case: loop until found.
        var routeParams = injector.parent.parent.parent.get(RouteParams);
        this.forumId = routeParams.get('forumId');
        
        this.getData();
    }

    getData () {
        var that = this;
        
        jQuery.ajax({
            url: 'services/forum/getThreadListByParent', 
            method: 'GET',
            dataType: 'json',
            data: {
                parentForumId: this.forumId
            }
        }).then(function(loadedList) {
             if (loadedList && loadedList.length) {
                for (var i = 0; i < loadedList.length; i++) {
                    var loopedItem = loadedList[i];
                    
                    that.items.push(
                        new Thread(
                            loopedItem.threadId,
                            loopedItem.forumId,
                            loopedItem.authorId,
                            loopedItem.label,
                            loopedItem.name,
                            loopedItem.lastEdited
                        )
                    );
                }
            }
        });
    };
    
    goToThread (threadId) {
        this._router.parent.navigate( ['Forum', { forumId: this.forumId }, 'WatchThread', { threadId: threadId }] );
    }
}

class Thread 
{
    threadId: string;
    forumId: string;
    authorId: string;
    label: string;
    name: string;
    lastEdited: Date;
    
    constructor(threadId: string, forumId: string, authorId: string, label: string, name: string, lastEdited: Date) {
        this.threadId = threadId;
        this.forumId = forumId;
        this.authorId = authorId;
        this.label = label;
        this.name = name;
        this.lastEdited = lastEdited; 
    }
}