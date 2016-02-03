import React, { Component }    from 'react';
import { connect }             from 'react-redux';
import { routeActions } from 'react-router-redux';
import { store } from '../store';

function goTo(path) {
  return () => {
    store.dispatch(routeActions.push(path));
  };
}

class IndexLayout extends Component {
  constructor(props) {
    super(props);
  }

  renderSessionButtons() {
    if (this.props.loggedIn) {
      return (<a onClick={goTo('/me')}>
        Dashboard<i className='pe-7s-angle-right-circle'></i>
      </a>);
    }

    return (<a onClick={goTo('/session/login')}>
      sign in <i className='pe-7s-angle-right-circle'></i>
    </a>);
  }

  render() {
    return (
      <div className='animated centered-content fadeIn'>
        <div className='index-mast-head centered-content'>
          <h1>Welcome on Phubo</h1>
          <h3>All your photos, in one place</h3>
          <br/>
          {this.renderSessionButtons()}
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    loggedIn: state.auth.loggedIn,
  };
}

export default connect(mapState)(IndexLayout);
