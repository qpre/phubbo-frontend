import {publish, subscribe} from '../../modules/Notifier/notifier';
import {profile, getProfile} from '../../modules/Social/facebook';

export default class PhotosViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: []
    };
  }

  componentWillMount () {
    getProfile();

    subscribe('facebook:photos:changed', () => {
      this.setState({ photos: profile.photos });
    });
  }

  renderPhotos () {
    return this.state.photos.map((p) => {
      return <div className='photo'>
        <img src={p.url}/>
      </div>;
    })
  }

  render () {
      return <div>
        <h1>Photos</h1>
        <div className='photos'>
            {this.renderPhotos()}
        </div>
      </div>;
  }
};
