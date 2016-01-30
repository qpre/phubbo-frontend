import React, { Component } from 'react';
import { navigate }         from '../utils/router';

function goTo(path) {
  return () => {
    navigate(path);
  };
}

export default class DefaultLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>404 not found</h1>
        <a onClick={goTo('')}>get back home</a>
      </div>
    );
  }
}
