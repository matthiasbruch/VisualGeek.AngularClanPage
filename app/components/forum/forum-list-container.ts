/// <reference path="../../../ext/definitions/jquery" />

import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Router, RouteParams} from 'angular2/router';
import {ForumListComponent} from './forum-list';
import {ForumThreadListComponent} from './forum-thread-list';

@Component({
    selector: 'forum-list-container',
    templateUrl: './app/components/forum/forum-list-container.html',
    directives: [ ForumListComponent, ForumThreadListComponent ]
})

export class ForumListContainerComponent {

    constructor() {
    }
    
}