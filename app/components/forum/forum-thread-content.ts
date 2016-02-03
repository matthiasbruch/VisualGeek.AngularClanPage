/// <reference path="../../../ext/definitions/jquery" />

import {Component} from 'angular2/core';

@Component({
    selector: 'forum-thread-content',
    templateUrl: './app/components/forum/forum-thread-content.html'
})

export class ForumThreadContentComponent {

    items: Post[];

    constructor() {
        this.items = [];
                
        this.getData();
    }

    getData () {
        var that = this;
        
        jQuery.ajax({
            url: 'services/forum/getPostsByThread', 
            method: 'GET',
            dataType: 'json'
        }).then(function(loadedList) {
             if (loadedList && loadedList.length) {
                for (var i = 0; i < loadedList.length; i++) {
                    var loopedItem = loadedList[i];
                    
                    that.items.push(
                        new Post(
                            loopedItem.postId,
                            loopedItem.threadId,
                            loopedItem.authorId,
                            loopedItem.title,
                            loopedItem.content,
                            loopedItem.spam,
                            loopedItem.reportCount,
                            loopedItem.updatedAt,
                            loopedItem.insertedAt
                        )
                    );
                }
            }
        });
    };
    
}

class Post 
{
    postId: string;
    threadId: string;
    authorId: string;
    title: string;
    content: string;
    spam: Boolean;
    reportCount: Number;
    updatedAt: Date;
    insertedAt: Date;
    
    constructor(
            postId: string,
            threadId: string,
            authorId: string,
            title: string,
            content: string,
            spam: Boolean,
            reportCount: Number,
            updatedAt: Date,
            insertedAt: Date
        ) {
        this.postId = postId;
        this.threadId = threadId;
        this.threadId = threadId;
        this.title = title;
        this.content = content;
        this.spam = spam;
        this.reportCount = reportCount;
        this.updatedAt = updatedAt;
        this.insertedAt = insertedAt;
    }
}