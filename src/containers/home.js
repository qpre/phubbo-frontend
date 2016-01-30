import React, { Component }    from 'react';
import { connect }             from 'react-redux';
import { navigate }            from '../utils/router';
import { redirectToLoginIfDisconnected } from '../actions/auth';

let goTo = (path) => {
  return () => {
    navigate(path);
  };
};

class HomeLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='index-layout animated bounceInUp'>
        <h1>Hi !</h1>
      </div>
    );
  }
}

function mapState(state) {
  return {
    loggedIn: state.auth.loggedIn,
  };
}

export default connect(mapState)(HomeLayout);
