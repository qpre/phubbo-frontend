import React, { Component } from 'react';

import '../../styles/user/profile.scss';

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='user profile'>
        <img src='//raw.githubusercontent.com/qpre/AEngine/master/readme/baracuda.png' />
        <h3 className='name'>Quentin Pré</h3>
        <div className='description'>Food and Code</div>
      </div>
    );
  }
}
