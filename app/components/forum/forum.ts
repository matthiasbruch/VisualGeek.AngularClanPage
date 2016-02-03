/// <reference path="../../../ext/definitions/jquery" />

import {Component} from 'angular2/core';
import {ForumListComponent} from './forum-list';
import {ForumThreadListComponent} from './forum-thread-list';
import {ForumThreadContentComponent} from './forum-thread-content';

@Component({
    selector: 'forum',
    templateUrl: './app/components/forum/forum.html',
    directives: [ForumListComponent, ForumThreadListComponent, ForumThreadContentComponent]
})

export class ForumComponent {

    listType = {
        ForumsAndThreads: true,
        ThreadContent: true    
    }

    constructor() {

    }
    
    createForum () {
        
        var newForum = {
            label: 'Mein Label ' + new Date().getTime(),
            name: 'name_' + new Date().getTime(),
            private: true
        };
                
        jQuery.ajax({
            url: 'services/forum/storeForum',
            method: 'POST',
            dataType: 'json',
            data: newForum
        }).done(function(result) {
            console.log(result);
            // that.clearEntry();
            // that.getData(true);
        });
    }
    
    createThread () {
        
        var newThread = {
            label: 'Mein Label ' + new Date().getTime(),
            name: 'name_' + new Date().getTime()
        };
                
        jQuery.ajax({
            url: 'services/forum/storeThread',
            method: 'POST',
            dataType: 'json',
            data: newThread
        }).done(function(result) {
            console.log(result);
            // that.clearEntry();
            // that.getData(true);
        });
    }
    
    createPost () {
        
        var newPost = {
            title: 'Mein Titel ' + new Date().getTime(),
            content: 'lorem ipsum ' + new Date().getTime()
        };               
                
        jQuery.ajax({
            url: 'services/forum/storePost',
            method: 'POST',
            dataType: 'json',
            data: newPost
        }).done(function(result) {
            console.log(result);
            // that.clearEntry();
            // that.getData(true);
        });
    }
    
}