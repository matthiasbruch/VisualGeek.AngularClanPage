/// <reference path="../../../ext/definitions/jquery" />

import {Component} from 'angular2/core';

@Component({
    selector: 'forum-thread-list',
    templateUrl: './app/components/forum/forum-thread-list.html'
})

export class ForumThreadListComponent {

    items: Thread[];

    constructor() {
        this.items = [];
                
        this.getData();
    }

    getData () {
        var that = this;
        
        jQuery.ajax({
            url: 'services/forum/getThreadListByParent', 
            method: 'GET',
            dataType: 'json'
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