import {navigate} from '../../utils/router';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logIn, logOut } from '../../actions/auth';

class SessionLoginLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      selected: -1,
    };
  }

  validate() {
    this.props.dispatch(logIn({ username: this.state.username, password: this.state.password }));
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
              onChange={ this.handleChange.bind(this, 'password') } />;
  }

  renderUsernameField(selected) {
    if (!selected) { return; }

    return <input  type="text"
              placeholder='username'
              value={this.state.username}
              onChange={ this.handleChange.bind(this, 'username') } />;
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

    return (
      <div className='session-login-layout centered-content fadeIn animated'>
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
      </div>
    );
  }
};

export default connect(state => state)(SessionLoginLayout);
