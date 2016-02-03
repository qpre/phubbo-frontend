import React, { Component } from 'react';
import { authorize } from '../../actions/social/facebook';
import { connect } from 'react-redux';

class FacebookAuthorizationButton extends Component {
  constructor(props) {
    super(props);
  }

  authorize() {
    return () => {
      this.props.dispatch(authorize());
    };
  }

  render() {
    if (this.props.isAuthorized) {
      return (<button disabled>Facebook authorized !</button>);
    }

    return (<button onClick={this.authorize()}>Facebook</button>);
  }
}

function mapState(state) {
  return {
    isFetchingAuth: state.facebookAuthorization.isFetching,
    isAuthorized:   state.facebookAuthorization.isAuthorized,
  };
}

export default connect(mapState)(FacebookAuthorizationButton);
