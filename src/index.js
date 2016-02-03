import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import { store, history } from './store';
import { default as routes } from './routes';

render(
  <Root routes={routes} store={store} history={history} />,
  document.getElementById('root')
);
