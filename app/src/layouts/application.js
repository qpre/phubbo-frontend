import {currentRoute} from '../modules/Router/router';
import {publish, subscribe} from '../modules/Notifier/notifier.js';

class ApplicationComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        yield: null
    };
  }

  yield (view) {
    this.setState({yield: view});
  }

  renderYield () {
    if (!this.state.yield) { return 'Not Found'; }

    return React.createElement(this.state.yield);
  }

  render () {
    return <div className='application'>
      <div id='background'></div>
      {this.renderYield()}
    </div> ;
  }
};

export var ApplicationLayout = React.createElement(ApplicationComponent);
