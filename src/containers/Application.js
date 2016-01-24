import React, { Component }    from 'react';
import { connect }             from 'react-redux';
import { bindActionCreators }  from 'redux';
import * as ApplicationActions from '../actions/Application';

class Application extends Component {
  render() {
    const { currentView } = this.props;

    return (
      <div>
        <h1>Phubo</h1>
        { (() => {
          if (!currentView) {
            return <h1>PAGE NOT FOUND</h1>;
          }

          return currentView.render();
        })()}
      </div>
    );
  }
}

function mapState(state) {
  return {
    currentView: state.currentView,
  };
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(ApplicationActions, dispatch),
  };
}

export default connect(mapState, mapDispatch)(Application);
