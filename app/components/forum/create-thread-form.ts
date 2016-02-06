/// <reference path="../../../ext/definitions/jquery" />

import {Component} from 'angular2/core';

@Component({
    selector: 'create-thread-form',
    templateUrl: './app/components/forum/create-thread-form.html'
})

export class CreateThreadFormComponent {

    newEntry = {
        label: ''
    };

    constructor() {
    }
    
    createThread () {
        
        var newThread = {
            label: this.newEntry.label,
            name: this.newEntry.label.replace(/[^a-z]/ig, "") + "_" + new Date().getTime(),
            forumId: 'base'
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