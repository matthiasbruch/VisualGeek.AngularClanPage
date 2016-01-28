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
    
}