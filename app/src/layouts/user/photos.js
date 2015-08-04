import {publish, subscribe} from '../../modules/Notifier/notifier';
import {PhotosViewer} from '../../components/photos/viewer.js';
import {FBLoginButton} from '../../components/social/fblogin.js';
import {FBLogoutButton} from '../../components/social/fblogout.js';
import {navigate} from '../../modules/Router/router';

export default class UserPhotosLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {

  }

  render () {
      return <div className='user-photos-layout centered-content bounceInUp animated'>
        <FBLoginButton /><FBLogoutButton />
        <PhotosViewer />
      </div>;
  }
};
