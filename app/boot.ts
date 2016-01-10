import {bootstrap}    from 'angular2/platform/browser'
import {HomeComponent} from './components/home/home'
import {ROUTER_PROVIDERS} from 'angular2/router';


bootstrap(HomeComponent, [
  ROUTER_PROVIDERS
]);