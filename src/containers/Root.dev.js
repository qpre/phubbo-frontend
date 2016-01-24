import React, { Component } from 'react';
import { Provider }         from 'react-redux';
import Application          from './Application';
import DevTools             from './DevTools';

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <Application />
          <DevTools />
        </div>
      </Provider>
    );
  }
}
