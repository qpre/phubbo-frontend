import React, { Component }    from 'react';
import { connect }             from 'react-redux';

import UserLeftColumn from '../components/user/leftcolumn';

class HomeLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='index-layout animated fadeIn'>
        <UserLeftColumn />
        { this.props.children }
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
