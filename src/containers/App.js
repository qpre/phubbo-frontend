import React, { Component } from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';

import * as reducers from '../reducers';

const reducer = combineReducers(reducers);
const store   = createStore(reducer);

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() => <div>Hello World !</div> }
        </Provider>

        {renderDevTools(store)}
      </div>,
      document.body
    );
  }
}
