import React, { Component } from 'react';
import { routeActions } from 'react-router-redux';
import { store } from '../store';

function goTo(path) {
  return () => {
    store.dispatch(routeActions.push(path));
  };
}

export default class DefaultLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='centered-content'>
        <h1>404 not found</h1>
        <a onClick={goTo('/')}>get back home</a>
      </div>
    );
  }
}
