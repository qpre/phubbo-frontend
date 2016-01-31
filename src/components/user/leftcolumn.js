import React, { Component } from 'react';
import BlurredBackground from '../blurred-background';
import UserProfile from './profile';
import UserMenu from './menu';

import '../../styles/user/left-column.scss';

export default class UserLeftColumn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='user left-column'>
        <BlurredBackground />
        <UserProfile />
        <hr/>
        <UserMenu />
      </div>
    );
  }
}
