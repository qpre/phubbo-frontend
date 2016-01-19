import {publish, subscribe} from '../../modules/Notifier/notifier';
import {navigate} from '../../modules/Router/router';
import * as Store from '../../modules/Data/Store';

import {post} from '../../lib/network';

export default class SessionLoginLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',

      selected: -1,

      knownUsers: [],
    };
  }

  componentWillMount() {
    let users = Store.get('knownUsers');
    users && this.setState({ knownUsers: Store.get('knownUsers') });
  }

  validate() {
    post('http://localhost:4080/api/auth/login', {
      username: this.state.username,
      password: this.state.password,
    }).then((data) => {
      Store.set('name', this.state.username);
      this.state.knownUsers.push({ name: this.state.username });
      Store.set('knownUsers', this.state.knownUsers);
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
    let icons = [];

    // render know user icons
    for (let user of this.state.knownUsers) {
      icons.push(() => {
        let index = this.state.knownUsers.indexOf(user);
        let left = (window.outerWidth / 2) - ((140 * (index - 1)) + 70);

        let selected = (this.state.knownUsers.indexOf(user)) === this.state.selected;
        let selectedClass = (selected) ? 'selected' : '';

        return <li onClick={ this.selectIcon(index, user.name) } style={{left: left + 'px'}} className={selectedClass}>
          <div className='name'>{user.name}</div>
          <div className='icon'>
          <img src={user.icon || 'https://raw.githubusercontent.com/qpre/AEngine/master/readme/baracuda.png'} />
          </div>
          <div className='hello'>Hello {user.name}</div>
          <div className='password'>{ this.renderPasswordField(selected) }</div>
          <div className='login'>
          { () => {
            if (selected) {
              return <button onClick={this.validate.bind(this)}><i className='pe-7s-angle-right'></i></button>;
            }}
          }
        </div>
        </li>
      });
    }

    // render log in
    icons.push(() => {
      let index         = this.state.knownUsers.length;
      let selected      = index == this.state.selected;
      let left          = (window.outerWidth / 2) - ((140 * (index)) + 70);
      let selectedClass = (selected) ? 'selected' : '';

      return <li onClick={this.selectIcon(index)} style={{left: left + 'px'}} className={selectedClass}>
        <div className='name'>Log In</div>
        <div className='icon'>
          <img src='https://raw.githubusercontent.com/qpre/AEngine/master/readme/baracuda.png' />
        </div>
        <div className='hello'>Hello !</div>
        <div className='password'>{ this.renderUsernameField(selected) }</div>
        <div className='password'>{ this.renderPasswordField(selected) }</div>
        <div className='login'>
        { () => {
          if (selected) {
            return <button onClick={this.validate.bind(this)}><i className='pe-7s-angle-right'></i></button>
          }}
        }
        </div>
        </li>
    });

    // render sign up

    return <div className='session-login-layout centered-content fadeIn animated'>
      <ul className='usericons'>
      { icons.map(c => {
        return c();
      })}
      </ul>
    </div>;
  }
};
