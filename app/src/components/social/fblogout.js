import {publish, subscribe} from '../../modules/Notifier/notifier';
import {navigate} from '../../modules/Router/router';
import * as Store from '../../modules/Data/store';

export class FBLogoutButton extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      disabled: true
    }
  }

  componentWillMount () {
    subscribe('store:update:facebook:profile', (profile) => {
      this.setState({ disabled: !profile.connected });
    });
  }

  logout () {
    window.FB.logout((response) => {
      Store.update('facebook:profile', { connected: false });
    });
  }

  render () {
    return <button onClick={this.logout} disabled={this.state.disabled} >FB Logout</button>;
  }
}
