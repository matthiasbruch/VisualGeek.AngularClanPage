import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'
import {MainNavigationComponent} from '../main-navigation/main-navigation';
import {NewsListComponent} from '../news-list/news-list';

@Component({
    selector: 'page-container',
    templateUrl: './app/components/page-container/page-container.html',
    directives: [MainNavigationComponent, ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/home', name: 'Home', component: NewsListComponent },
    { path: '/**', component: NewsListComponent }
])

export class PageContainerComponent { }