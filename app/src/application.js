import {initRouter} from './modules/Router/router';
import {ApplicationLayout} from './layouts/application';
import {initFBDriver} from './modules/Social/facebook';
import * as Data from './modules/Data/Store';

export let appView = React.render(ApplicationLayout, document.body);

Data.restore();
initRouter();
initFBDriver();
