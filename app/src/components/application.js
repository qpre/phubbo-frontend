import {currentRoute} from '../modules/Router/router';
import {publish, subscribe} from '../modules/Notifier/notifier.js';
import {FBLoginButton} from '../components/Social/fblogin.js';
import {FBLogoutButton} from '../components/Social/fblogout.js';

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
    return <div>
      <FBLoginButton /><FBLogoutButton />
      <div>
        {this.renderYield()}
      </div>
    </div>;
  }
};

export var ApplicationView = React.createElement(ApplicationComponent);
