import React, { Component } from 'react';
import { history } from '../../store';
import '../../styles/user/menu.scss';

function goTo(path) {
  return () => {
    history.push(path);
  };
}

export default class UserMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className='user menu'>
        <li onClick={goTo('/me/photos')}>PHOTOS</li>
        <li onClick={goTo('/me/accounts')}>ACCOUNTS</li>
      </ul>
    );
  }
}
