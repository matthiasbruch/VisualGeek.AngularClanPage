/// <reference path="../../../ext/definitions/jquery" />

import {Component, Injector} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

@Component({
    selector: 'create-thread-form',
    templateUrl: './app/components/forum/create-thread-form.html'
})

export class CreateThreadFormComponent {

    newEntry = {
        label: ''
    };
    
    forumId: string;

    constructor(private _router: Router, injector: Injector) {
        // Todo: Improve this ... worst case: loop until found.
        var routeParams = injector.parent.parent.parent.get(RouteParams);
        this.forumId = routeParams.get('forumId');
    }
    
    createThread () {
        
        var newThread = {
            label: this.newEntry.label,
            name: this.newEntry.label.replace(/[^a-z]/ig, "") + "_" + new Date().getTime(),
            forumId: this.forumId
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
}