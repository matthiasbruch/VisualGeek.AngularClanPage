/// <reference path="../../../ext/definitions/jquery" />

import {Component} from 'angular2/core';

@Component({
    selector: 'guestbook',
    templateUrl: './app/components/guestbook/guestbook.html'
})

export class GuestbookComponent {

    items : GuestBookEntry[];
    newEntry: GuestBookEntry;

    constructor() {
        this.items = [];
        
        this.newEntry = new GuestBookEntry('', '', '', false, new Date());

        this.getData(false);
    }
    
    clearEntry () {
        this.newEntry = new GuestBookEntry('', '', '', false, new Date());
    }
    
    getData (clearList: boolean) {
        var that = this;
        
        jQuery.ajax({
            url: 'services/guestbook/list',
            method: 'GET',
            dataType: 'json'
        }).then(function(loadedList) {
            if (clearList) {
                that.items.length = 0;
            }
            
            if (loadedList && loadedList.length) {
                for (var i = 0; i < loadedList.length; i++) {
                    var loopedItem = loadedList[i];
                    
                    that.items.push(
                        new GuestBookEntry(
                            loopedItem.message,
                            loopedItem.title,
                            loopedItem.author,
                            false,
                            new Date()
                        )
                    );
                }
            }
        });
    };
    
    createEntry (req, resp) {
        if (this._validateGuestbookEntry(this.newEntry)) {
            var that = this;
            
            // Resetting values.
            // [MB]
            this.newEntry.approved = false;
            this.newEntry.insertedAt = new Date();
            
            jQuery.ajax({
                url: 'services/guestbook/createEntry',
                method: 'POST',
                dataType: 'json',
                data: this.newEntry
            }).done(function(loadedList) {
                that.clearEntry();
                that.getData(true);
            });   
        }
    };
    
   _validateGuestbookEntry (resp) {
       return true;
   } 
}

class GuestBookEntry 
{
    message: string;
    title: string;
    author: string;
    approved: boolean;
    insertedAt: Date;
    
    constructor(message: string, title: string, author: string, approved: boolean, insertedAt: Date) {
        this.message = message;
        this.title = title;
        this.author = author;
        this.approved = approved;
        this.insertedAt = insertedAt;
    }
}