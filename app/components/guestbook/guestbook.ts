/// <reference path="../../../ext/definitions/jquery" />

import {Component} from 'angular2/core';

@Component({
    selector: 'guestbook',
    templateUrl: './app/components/guestbook/guestbook.html'
})

export class GuestbookComponent {

    items : GuestBookEntry[];

    constructor() {
        this.items = [];
        
        this.getData();
    }
    
    getData () {
        var that = this;
        
        jQuery.ajax({
            url: 'services/guestbook/list',
            method: 'GET',
            dataType: 'json'
        }).then(function(loadedList) {
            if (loadedList && loadedList.length) {
                for (var i = 0; i < loadedList.length; i++) {
                    var loopedItem = loadedList[i];
                    
                    that.items.push(
                        new GuestBookEntry(
                            loopedItem.message,
                            loopedItem.title,
                            loopedItem.author,
                            loopedItem.approved,
                            Date.parse(loopedItem.insertedAt)
                        )
                    );
                }
            }
        })
    }
}

class GuestBookEntry 
{
    message: string;
    title: string;
    author: string;
    approved: boolean;
    insertedAt: number;
    
    constructor(message: string, title: string, author: string, approved: boolean, insertedAt: number) {
        this.message = message;
        this.title = title;
        this.author = author;
        this.approved = approved;
        this.insertedAt = insertedAt;
    }
}