import React, { Component }    from 'react';
import { connect }             from 'react-redux';

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
