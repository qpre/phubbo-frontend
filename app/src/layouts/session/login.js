import {publish, subscribe} from '../../modules/Notifier/notifier';
import {navigate} from '../../modules/Router/router';
import * as Store from '../../modules/Data/store';

export default class SessionLoginLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  validate () {

    if ((this.state.username === 'test') && (this.state.password === 'toto')) {
      Store.set('name', this.state.username);
      navigate('/');
    } else {
      (document.getElementsByClassName('session-login-layout'))[0].classList.add('shake');
    }
  }

  handleChange (field, event) {
    let state = {};
    state[field] = event.target.value;
    this.setState(state);
  }

  render () {
    return <div className='session-login-layout centered-content fadeIn animated'>
      <input type="text" placeholder='username' value={this.state.username} onChange={this.handleChange.bind(this, 'username')} />
      <input type="password" placeholder='password' value={this.state.password} onChange={this.handleChange.bind(this, 'password')} />
      <button onClick={this.validate.bind(this)}>login</button>
    </div>;
  }
};
