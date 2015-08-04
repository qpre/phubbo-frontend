import {publish, subscribe} from '../../modules/Notifier/notifier';
import {navigate} from '../../modules/Router/router';

export default class UserMeLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {

  }

  render () {
      return <div className='user-me-layout centered-content fadeIn animated'>
        Hello
      </div>;
  }
};
