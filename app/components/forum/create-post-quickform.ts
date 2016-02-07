/// <reference path="../../../ext/definitions/jquery" />

import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({
    selector: 'create-post-quickform',
    templateUrl: './app/components/forum/create-post-quickform.html'
})

export class CreatePostQuickFormComponent {

    newEntry = {
        content: ''
    };
    
    threadId: string;

    constructor(routeParams: RouteParams) {
        this.threadId = routeParams.get('threadId');
    }
    
    createQuickPost () {
        
        var newThread = {
            content: this.newEntry.content,
            threadId: this.threadId
        };            
                
        jQuery.ajax({
            url: 'services/forum/storePost',
            method: 'POST',
            dataType: 'json',
            data: newThread
        }).done(function(result) {
            console.log(result);
            // that.clearEntry();
            // that.getData(true);
        });
    }
}