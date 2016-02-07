/// <reference path="../../../ext/definitions/jquery" />

import {Component, Injector} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

@Component({
    selector: 'forum-list',
    templateUrl: './app/components/forum/forum-list.html'
})

export class ForumListComponent {

    items: Forum[];
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
            url: 'services/forum/getForumListByParent?parentForumId=' + this.forumId, 
            method: 'GET',
            dataType: 'json'
        }).then(function(loadedList) {
            that.items.length = 0;
            
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
    
    goToForum (forumId) {
        this._router.parent.navigate( ['Forum', { forumId: forumId }, 'List'] );
    }
    
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