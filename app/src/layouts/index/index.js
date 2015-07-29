import {publish, subscribe} from '../../modules/Notifier/notifier';
import {FBLoginButton} from '../../components/social/fblogin.js';
import {FBLogoutButton} from '../../components/social/fblogout.js';

export default class IndexLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {

  }

  render () {
      return <div className='index-layout centered-content bounceInUp animated'>
        <h1>Welcome on Phubo (beta)</h1>
        <div>
          you should see a login form here, but it has not been created yet.<br/>
          Have fun with these buttons instead<br/>
          <FBLoginButton /><FBLogoutButton />
        </div>
      </div>;
  }
};
