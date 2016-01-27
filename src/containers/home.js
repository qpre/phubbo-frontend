import React, { Component }    from 'react';
import { connect }             from 'react-redux';
import { navigate }            from '../utils/router';

let goTo = (path) => {
  return () => {
    navigate(path);
  };
};

export default class HomeLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='index-layout animated bounceInUp'>
        <h1>Welcome on Phubo (beta)</h1>
        <a onClick={goTo('session/login')}>sign in <i className='pe-7s-angle-right-circle'></i></a>
      </div>
    );
  }
}
