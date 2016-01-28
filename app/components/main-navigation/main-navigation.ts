import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {LoginFormComponent} from '../login-form/login-form';

@Component({
    selector: 'main-navigation',
    templateUrl: './app/components/main-navigation/main-navigation.html',
    directives: [RouterLink, LoginFormComponent]
})

export class MainNavigationComponent 
{ 
    MenuSections: MenuSection[];
    
    constructor() {
        this.MenuSections = [];
        
        var mainSection = new MenuSection("Main", [
            new MenuItem("Home", "Home"),
            // new MenuItem("News", "News"),
            // new MenuItem("Forum", "Forum"),
            // new MenuItem("History", "History"),
            // new MenuItem("Member", "Member"),
            new MenuItem("Guestbook", "Guestbook"),
            // new MenuItem("Downloads", "Downloads"),
            // new MenuItem("Public Server", "PublicServer")
        ]);
        
    //     var contactSection = new MenuSection("Contact", [
    //         new MenuItem("Rules", "Rules"),
    //         new MenuItem("Link Us", "LinkUs"),
    //         new MenuItem("Join Us", "JoinUs"),
    //         new MenuItem("Impressum", "Impressum"),
    //         new MenuItem("Contact Us", "ContactUs")
    //     ]);
    // 
        this.MenuSections.push(mainSection);
        // this.MenuSections.push(contactSection);
    }
}

class MenuSection 
{
    Label: string;
    Items: MenuItem[];
    
    constructor(label: string, items: MenuItem[]) {
        this.Label = label;
        this.Items = items;
    }
}

class MenuItem 
{
    Label: string;
    RouterLink: string;
    
    constructor(label: string, routerLink: string) {
        this.Label = label;
        this.RouterLink = routerLink;
    }    
}