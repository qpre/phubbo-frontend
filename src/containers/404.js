import React, { Component }    from 'react';
import { connect }             from 'react-redux';
import { navigate }            from '../utils/router';

let goTo = (path) => {
  return () => {
    navigate(path);
  };
};

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
