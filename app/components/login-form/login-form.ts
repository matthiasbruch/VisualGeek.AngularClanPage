import {Component} from 'angular2/core';

@Component({
    selector: 'login-form',
    templateUrl: './app/components/login-form/login-form.html'
})

export class LoginFormComponent {
    credentials = {
      username: null,
      password: null  
    };
    
    constructor() { }
    
    onSubmit () {
        var that = this;
        
        var param = {
            username: this.credentials.username,
            password: this.credentials.password    
        };
        
        // Reset after copying.
        // [MB]
        this.credentials.password = null;
        
        jQuery.ajax({
            url: 'login',
            method: 'POST',
            dataType: 'json',
            data: param
        }).then(function(loginResult) {
        });
    }
 }