import '../styles/reset.css';
import '../styles/animate.css';
import '../styles/pe-icon-7-stroke.css';
import '../styles/main.scss';

import React, { Component }    from 'react';
import { connect }             from 'react-redux';
import { store } from '../store';

import Background from '../components/Background';

class Application extends Component {
  render() {
    const { currentView } = this.props;

    return (
      <div className='application'>
        <Background />
        { (() => {
          if (!currentView) { return 'Page not found'; }

          return React.createElement(currentView, { store });
        })()}
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
