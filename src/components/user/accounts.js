import React, { Component } from 'react';
import FacebookAuthorizationButton from './facebook-authorization-button';

import '../../styles/user/accounts.scss';

export default class UserAccounts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='user accounts'>
        <FacebookAuthorizationButton />
      </div>
    );
  }
}
