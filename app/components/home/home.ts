import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'my-app',
    templateUrl: './app/components/home/home.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  {path:'/home', name: 'Home', component: HomeComponent}
])

export class HomeComponent { }