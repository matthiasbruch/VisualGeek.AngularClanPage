/// <reference path="../../../ext/definitions/jquery" />

import {Component} from 'angular2/core';
import {RouterLink, RouteParams} from 'angular2/router';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ForumListContainerComponent} from './forum-list-container';
import {ForumThreadContentComponent} from './forum-thread-content';
import {CreateThreadFormComponent} from './create-thread-form';

@Component({
    selector: 'forum',
    templateUrl: './app/components/forum/forum.html',
    directives: [RouterLink, ROUTER_DIRECTIVES, ForumListContainerComponent, ForumThreadContentComponent]
})

@RouteConfig([
    { path:'/list', name: 'List', component: ForumListContainerComponent, useAsDefault: true },
    { path:'/create-thread', name: 'CreateThread', component: CreateThreadFormComponent },
    { path:'/watch-thread/:threadId', name: 'WatchThread', component: ForumThreadContentComponent }
])

export class ForumComponent {

    constructor(routeParams: RouteParams) {
        
    }
    
    // createForum () {
    //     
    //     var newForum = {
    //         label: 'Mein Label ' + new Date().getTime(),
    //         name: 'name_' + new Date().getTime(),
    //         private: true
    //     };
    //             
    //     jQuery.ajax({
    //         url: 'services/forum/storeForum',
    //         method: 'POST',
    //         dataType: 'json',
    //         data: newForum
    //     }).done(function(result) {
    //         console.log(result);
    //         // that.clearEntry();
    //         // that.getData(true);
    //     });
    // }
    // 

    // 
    // createPost () {
    //     
    //     var newPost = {
    //         title: 'Mein Titel ' + new Date().getTime(),
    //         content: 'lorem ipsum ' + new Date().getTime()
    //     };               
    //             
    //     jQuery.ajax({
    //         url: 'services/forum/storePost',
    //         method: 'POST',
    //         dataType: 'json',
    //         data: newPost
    //     }).done(function(result) {
    //         console.log(result);
    //         // that.clearEntry();
    //         // that.getData(true);
    //     });
    // }
    
}