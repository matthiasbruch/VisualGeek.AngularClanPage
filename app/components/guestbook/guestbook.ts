/// <reference path="../../../ext/definitions/jquery" />

import {Component} from 'angular2/core';

@Component({
    selector: 'guestbook',
    templateUrl: './app/components/guestbook/guestbook.html'
})

export class GuestbookComponent {

    constructor() {
        jQuery.ajax({
            url: 'services/test',
            method: 'GET'
        });
    }
}