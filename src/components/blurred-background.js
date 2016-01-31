import React, { Component } from 'react';

import '../styles/blurred-background.scss';

export default class BlurredBackground extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='blurred-background'></div>
    );
  }
}
