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
    if (!this.state.yield) { return 'no yield'; }

    return React.createElement(this.state.yield);
  }

  render () {
      return <div>
          {this.renderYield()}
      </div>;
  }
};

export var ApplicationView = React.createElement(ApplicationComponent);
