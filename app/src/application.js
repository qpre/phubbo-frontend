import {initRouter, addRoute, navigate} from './modules/Router/router';

initRouter();

addRoute('photos', () => {
  console.log('now on photos !');
});

navigate('photos');
