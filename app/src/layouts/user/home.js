import {publish, subscribe} from '../../modules/Notifier/notifier';
import {navigate} from '../../modules/Router/router';
import {authorized} from '../../modules/Router/filters';
import * as Store from '../../modules/Data/Store';
import {MenuLeft} from '../../components/menu/left';

export default class HomeLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
    };
  }

  componentWillMount() {
    if (authorized()) {
      this.setState({ name: Store.get('user').name });
    };
  }

  render() {
    return <div className='user-me-layout fadeIn animated'>
      <MenuLeft name={this.state.name} />
      <div className='content'>
        Hello {this.state.name}

        <button>authorize facebook</button>
      </div>


    </div>;
  }
};
