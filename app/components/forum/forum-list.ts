/// <reference path="../../../ext/definitions/jquery" />

import {Component} from 'angular2/core';

@Component({
    selector: 'forum-list',
    templateUrl: './app/components/forum/forum-list.html'
})

export class ForumListComponent {

    items: Forum[];

    constructor() {
        this.items = [];
                
        this.getData();
    }

    getData () {
        var that = this;
        
        jQuery.ajax({
            url: 'services/forum/getForumListByParent', 
            method: 'GET',
            dataType: 'json'
        }).then(function(loadedList) {
             if (loadedList && loadedList.length) {
                for (var i = 0; i < loadedList.length; i++) {
                    var loopedItem = loadedList[i];
                    
                    that.items.push(
                        new Forum(
                            loopedItem.forumId,
                            loopedItem.parentId,
                            loopedItem.label,
                            loopedItem.name,
                            loopedItem.description,
                            loopedItem.sortIdx,
                            loopedItem.isPrivate
                        )
                    );
                }
            }
        });
    };
    
}

class Forum 
{
    forumId: string;
    parentId: string;
    label: string;
    name: string; 
    description: string;
    sortIdx: Number;
    private: Boolean;
    
    constructor(forumId: string, parentId: string, label: string, name: string, description: string, sortIdx: Number, isPrivate: Boolean) {
        this.forumId = forumId;
        this.parentId = parentId;
        this.label = label;
        this.name = name; 
        this.description = description; 
        this.sortIdx = sortIdx;
        this.private = isPrivate;
    }
}