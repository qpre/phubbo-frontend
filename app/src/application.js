import {initRouter, addRoute, navigate} from './modules/Router/router';
import {ApplicationView} from './components/application';
import {initFBPlugin} from './modules/Social/facebook';
import PhotosView from './components/Photos/photos';

initRouter();

let appView = React.render(ApplicationView, document.body);

addRoute('photos', () => {
  appView.yield(PhotosView);

  console.log('now on photos !');
});

addRoute('', () => {
  console.log('now on index !');
});

initFBPlugin();
