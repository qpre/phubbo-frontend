import React, { Component } from 'react';

import '../../styles/user/menu.scss';

export default class UserMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className='user menu'>
        <li>PHOTOS</li>
      </ul>
    );
  }
}
