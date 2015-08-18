import {publish, subscribe} from '../../modules/Notifier/notifier';
import {checkAuthorized} from '../../modules/Router/filters';
import * as Store from '../../modules/Data/Store';

export class MenuLeft extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      photo: null
    }
  }

  componentWillMount () {
    checkAuthorized();
    this.setState({ name: Store.get('name') });
  }

  render () {
    return <ul className='menu left'>
      <li className='profile'>
        <div className='cell photo'><img src='https://scontent-ams2-1.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/537913_10153030282134869_859092913535597309_n.jpg?oh=1a6b7640becae3229e17fadd96919d9c&oe=56395BE7' /></div>
        <div className='cell name'>{this.state.name}</div>
        <div className='cell logout'><i className='pe-7s-close'></i></div>
      </li>
      <li>photos</li>
    </ul>;
  }
};
