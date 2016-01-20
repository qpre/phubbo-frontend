import {publish, subscribe} from '../../modules/Notifier/notifier';
import {navigate} from '../../modules/Router/router';
import * as Store from '../../modules/Data/Store';
import * as Auth  from '../../modules/Auth/auth';

export default class SessionLoginLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      selected: -1,
    };
  }

  componentWillMount() {
  }

  validate() {
    Auth.logIn(this.state.username, this.state.password).then(() => {
      navigate('');
    }).catch((err) => {
      (document.getElementsByClassName('session-login-layout'))[0].classList.add('shake');
    });
  }

  handleChange(field, event) {
    let state = {};
    state[field] = event.target.value;
    this.setState(state);
  }

  renderPasswordField(selected) {
    if (!selected) { return; }

    return <input  type="password"
              placeholder='password'
              value={this.state.password}
              onChange={this.handleChange.bind(this, 'password')} />
  }

  renderUsernameField(selected) {
    if (!selected) { return; }

    return <input  type="text"
              placeholder='username'
              value={this.state.username}
              onChange={this.handleChange.bind(this, 'username')} />
  }

  selectIcon(index, name) {
    return (e) => {
      if (this.state.selected == index) { return; }

      document.body.querySelector('.usericons').classList.add('single');
      this.setState({
        selected: index,
        username: '',
      });
    };
  }

  render() {
    // render sign up
    let selected = this.state.selected == 0;

    return <div className='session-login-layout centered-content fadeIn animated'>
      <ul className='usericons'>
        <li onClick={this.selectIcon(0)} className={ (selected) ? 'selected' : '' }>
          <div className='name'>Log In</div>
          <div className='icon'>
            <img src='https://raw.githubusercontent.com/qpre/AEngine/master/readme/baracuda.png' />
          </div>
          <div className='hello'>Hello !</div>
          <div className='password'>{ this.renderUsernameField(selected) }</div>
          <div className='password'>{ this.renderPasswordField(selected) }</div>
          <div className='login'>
            { (() => {
              if (selected) {
                return <button onClick={this.validate.bind(this)}><i className='pe-7s-angle-right'></i></button>;
              }})()
            }
          </div>
        </li>
      </ul>
    </div>;
  }
};
