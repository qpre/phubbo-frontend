import {initRouter, addRoute, navigate} from './modules/Router/router';
import {ApplicationLayout} from './layouts/application';
import {initFBDriver} from './modules/Social/facebook';
import IndexLayout from './layouts/Index/index';

initRouter();

let appView = React.render(ApplicationLayout, document.body);

addRoute('photos', () => {
  appView.yield(PhotosViewer);

  console.log('now on photos !');
});

addRoute('profile', () => {

  console.log('now on photos !');
});

addRoute('', () => {
  appView.yield(IndexLayout);

  console.log('now on index !');
});

initFBDriver();
