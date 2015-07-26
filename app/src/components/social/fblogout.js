import {navigate} from '../../modules/Router/router';

export class FBLogoutButton extends React.Component {
  constructor (props) {
    super(props);
  }

  logout () {
    if (window.FB) {
      window.FB.logout((response) => {
        navigate('');
      });
    }
  }

  render () {
    return <button onClick={this.logout}>FB Logout</button>;
  }
}
