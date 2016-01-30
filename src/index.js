import React from 'react';
import { render } from 'react-dom';
import { attachRoutes } from './routes/index';
import Root from './containers/Root';
import { store } from './store';

render(
  <Root store={store} />,
  document.getElementById('root')
);

attachRoutes();
