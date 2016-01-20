import {publish, subscribe} from '../../modules/Notifier/notifier';
import {checkAuthorized}    from '../../modules/Router/filters';
import {logout}             from '../../modules/Router/filters';
import * as Store           from '../../modules/Data/Store';
import * as Auth            from '../../modules/Auth/auth';

export class MenuLeft extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: null,
    };
  }

  logOut() {
    return (e) => {
      Auth.logOut();
    };
  }

  render() {
    return <ul className='menu left'>
      <li className='profile'>
        <div className='cell photo'><img src='//fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-xft1/t31.0-8/11942339_10153558581939869_2161155812686771950_o.jpg' /></div>
        <div className='cell name'>{this.props.name}</div>
        <div className='cell logout'><i className='pe-7s-close' onClick={this.logOut()}></i></div>
      </li>
      <li>photos</li>
    </ul>;
  }
};
