import {publish, subscribe} from '../../modules/Notifier/notifier';
import {getProfile, getPhotos} from '../../modules/Social/facebook';
import * as Store from '../../modules/Data/Store';

export class PhotosViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
    };

    subscribe('store:update:facebook:profile', () => {
      this.setState({ photos: Store.get('facebook:profile').photos });
    });
  }

  componentWillMount() {
    getPhotos();
  }

  renderPhotos() {
    return this.state.photos.map((p) => {
      return <div className='photo'>
        <img src={p.url}/>
      </div>;
    });
  }

  render() {
    return <div>
      <h1>Photos</h1>
      <div className='photos'>
          {this.renderPhotos()}
      </div>
    </div>;
  }
};
