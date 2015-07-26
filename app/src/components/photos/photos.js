import {publish, subscribe} from '../../modules/Notifier/notifier.js';

export default class PhotosView extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          photos: [
            {
              url: 'https://scontent-ams3-1.xx.fbcdn.net/hphotos-xft1/v/t1.0-9/1510796_10152565720217839_2842854233338066255_n.jpg?oh=46db09317fa7d56f0d15c6d7af54dbf9&oe=564FDA6A'
            },
            {
              url: 'https://scontent-ams3-1.xx.fbcdn.net/hphotos-xft1/v/t1.0-9/1510796_10152565720217839_2842854233338066255_n.jpg?oh=46db09317fa7d56f0d15c6d7af54dbf9&oe=564FDA6A'
            }
          ]
      };
    }

    componentWillMount () {
      // do something
    }

    renderPhotos () {
      return this.state.photos.map((p) => {
        return <div className='photo'>
          <img src={p.url}/>
        </div>;
      })
    }

    render () {
        return <div className='photos'>
            {this.renderPhotos()}
        </div>;
    }
};
