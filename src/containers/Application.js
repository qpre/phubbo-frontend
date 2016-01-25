import React, { Component }    from 'react';
import { connect }             from 'react-redux';
import { bindActionCreators }  from 'redux';
import { yieldContainer }      from '../actions/router';

class Application extends Component {
  render() {
    const { currentView } = this.props;

    return (
      <div>
        <h1>Phubo</h1>
        { currentView ? currentView() : 'Page Not Found' }
      </div>
    );
  }
}

function mapState(state) {
  return {
    currentView: state.router && state.router.currentView,
  };
}

export default connect(mapState)(Application);
