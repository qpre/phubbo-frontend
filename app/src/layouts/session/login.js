import {publish, subscribe} from '../../modules/Notifier/notifier';
import {navigate} from '../../modules/Router/router';
import * as Store from '../../modules/Data/Store';

export default class SessionLoginLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      knownUsers: []
    }
  }

  componentWillMount () {
    let users = Store.get('knownUsers');
    users && this.setState({knownUsers: Store.get('knownUsers') });
  }

  validate () {
    if ((this.state.username === 'test') && (this.state.password === 'toto')) {
      Store.set('name', this.state.username);
      this.state.knownUsers.push({ name: this.state.username });
      Store.set('knownUsers', this.state.knownUsers);
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

  selectUser (user) {
    return (e) => {
      e.currentTarget.classList.add('selected');

      document.body.querySelector('.usericons').classList.add('single');
      this.setState({ username: user.name });
    }
  }

  renderKnownUsers () {
    return this.state.knownUsers.map((user) => {
      let index = this.state.knownUsers.indexOf(user);
      let left = (window.outerWidth / 2) - ((140 * (index - 1)) + 70);
      return <li onClick={this.selectUser(user)} style={{left: left + 'px'}} >
        <div className='name'>{user.name}</div>
        <div className='icon'>
          <img src={user.icon || 'https://raw.githubusercontent.com/qpre/AEngine/master/readme/baracuda.png'} />
        </div>
        <div className='hello'>Hello {user.name}</div>
      </li>;
    })
  }

  render () {
    return <div className='session-login-layout centered-content fadeIn animated'>
      <ul className='usericons'>
        {this.renderKnownUsers()}
      </ul>
    </div>;

    // return <div className='session-login-layout centered-content fadeIn animated'>
    //   <ul className='usericons'>
    //     {this.renderKnownUsers()}
    //   </ul>
    //   <input type="text" placeholder='username' value={this.state.username} onChange={this.handleChange.bind(this, 'username')} />
    //   <input type="password" placeholder='password' value={this.state.password} onChange={this.handleChange.bind(this, 'password')} />
    //   <button onClick={this.validate.bind(this)}>login</button>
    // </div>;
  }
};
