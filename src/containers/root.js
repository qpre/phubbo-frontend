import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Application from './Application';

export default class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <Application />
      </Provider>
    );
  }
}
