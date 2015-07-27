import {navigate} from '../../modules/Router/router';
import {publish, subscribe} from '../../modules/Notifier/notifier';
import * as Store from '../../modules/Data/store';

export class FBLoginButton extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      disabled: false
    }
  }

  componentWillMount () {
    subscribe('store:update:facebook:profile', (profile) => {
      this.setState({ disabled: profile.connected });
    });
  }

  login () {
    if (!Store.get('facebook:profile').connected) {
      window.FB.login();
    }
  }

  render () {
    return <button onClick={this.login} disabled={this.state.disabled}>FB Login</button>;
  }
}
