import {publish, subscribe} from '../../modules/Notifier/notifier';
import {navigate} from '../../modules/Router/router';
import {checkAuthorized} from '../../modules/Router/filters';
import * as Store from '../../modules/Data/Store';
import {MenuLeft} from '../../components/menu/left';

export default class HomeLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null
    }
  }

  componentWillMount () {
    checkAuthorized();
    this.setState({ name: Store.get('name') });
  }

  render () {
      return <div className='user-me-layout fadeIn animated'>
        <MenuLeft />
        Hello {this.state.name}
      </div>;
  }
};
