import {initRouter} from './modules/Router/router';
import {ApplicationLayout} from './layouts/application';
import {initFBDriver} from './modules/Social/facebook';

export let appView = React.render(ApplicationLayout, document.body);

initRouter();
initFBDriver();
