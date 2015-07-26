import {navigate} from '../../modules/Router/router';
import {publish, subscribe} from '../../modules/Notifier/notifier';

function checkStatus () {
  window.FB.getLoginStatus(function(response) {
    if (response.status !== 'connected') {
      login();
      subscribe('facebook:connected', () => {
        navigate('photos');
      })
    }
  })
};

function login () {
  window.FB.login();
};

export class FBLoginButton extends React.Component {
  constructor (props) {
    super(props);
  }

  login () {
    checkStatus();
  }

  render () {
    return <button onClick={this.login}>FB Login</button>;
  }
}
