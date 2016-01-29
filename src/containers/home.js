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

  componentWillMount() {
    if (!this.props.loggedIn) {
      navigate('session/login');
    }
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

function mapState(state) {
  return {
    loggedIn: state.auth.loggedIn,
  }
}

export default connect(mapState)(HomeLayout);
