import {publish, subscribe} from '../../modules/Notifier/notifier';
import {navigate} from '../../modules/Router/router';
import {MenuLeft} from '../../components/menu/left';

export default class IndexLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {

  }

  goTo (path) {
    return () => {
      navigate(path);
    }
  }

  render () {
      return <div className='index-layout animated bounceInUp'>
        <h1>Welcome on Phubo (beta)</h1>
        <a onClick={this.goTo('session/login')}>sign in <i className='pe-7s-angle-right-circle'></i></a>
      </div>;
  }
};
