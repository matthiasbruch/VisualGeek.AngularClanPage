import {bootstrap}    from 'angular2/platform/browser'
import {PageContainerComponent} from './components/page-container/page-container'
import {ROUTER_PROVIDERS} from 'angular2/router';

bootstrap(PageContainerComponent, [
  ROUTER_PROVIDERS
]);