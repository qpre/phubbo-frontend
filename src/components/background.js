import React, { Component } from 'react';

export default class Background extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="background" style={{ backgroundImage: 'url(/assets/img/home-bg.png)' }}></div>
    );
  }
}
