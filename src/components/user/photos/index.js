import React, { Component } from 'react';
import { getPhotos } from '../../../actions/social/facebook';
import { connect } from 'react-redux';

import '../../../styles/user/photos.scss';

class UserPhotos extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getPhotos());
  }

  renderPhotos() {
    function renderPhoto(p) {
      return (
        <div className='photo'
          key={p.id}
          style={{ backgroundImage: `url(${p.urlSmall})` }}
        >
        </div>
      );
    }

    return this.props.photos.map(renderPhoto);
  }

  render() {
    return (
      <div className='user photos'>
        { this.renderPhotos() }
      </div>
    );
  }
}

function mapState(state) {
  return {
    photos: state.facebookAuthorization.photos,
  };
}

export default connect(mapState)(UserPhotos);
