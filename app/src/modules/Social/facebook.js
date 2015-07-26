import {publish, subscribe} from '../../modules/Notifier/notifier';
import {navigate} from '../../modules/Router/router';

export var profile = {
  id: null,
  name: '',
  photos: []
};

export function initFBPlugin () {
  window.fbAsyncInit = function () {
    window.FB.init({
      appId : '293516484105634',
      status: true, // check login status
      cookie: true, // enable cookies to allow the server to access the session
      xfbml : true,  // parse XFBML
      version: 'v2.3'
    });

    window.FB.Event.subscribe("auth.authResponseChange", function(response) {
      if (response.status === "connected") {
        publish('facebook:connected');
        getProfile();
      }
    });
  };

  (function (d) {
    let js;
    let id = 'facebook-jssdk';
    if (d.getElementById(id)) { return; }
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = '//connect.facebook.net/en_US/all.js';
    d.getElementsByTagName('head')[0].appendChild(js);
  }(document));
};

export function getProfile () {
  FB.api("/me", "get", {}, (result) => {
    if (result.error) { navigate(''); }

    profile['id']         = result.id;
    profile["name"]       = result.name;

    publish('facebook:profile:changed');
    getPhotos();
  });
}

function getPhotos() {
  FB.api('me/photos', "get", {}, (result) => {
    if (result.error) { navigate(''); }
    debugger;
    let photos = result.data;

    for (let p of photos) {
      if (p.images && (p.images.length > 0)){
        profile.photos.push({ url: p.images[0].source });
      }
    }

    publish('facebook:photos:changed');
  });
}
