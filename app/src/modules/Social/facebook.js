import {publish, subscribe} from '../Notifier/notifier';
import {navigate} from '../Router/router';
import * as Store from '../Data/Store';

let FBProfile = {
  id: null,
  name: '',
  photos: [],

  connected: false
}

function saveProfile () {
  Store.set('facebook:profile', FBProfile);
}

export function initFBDriver () {
  // Setting up model
  Store.set('FBProfile', {
    id: null,
    name: '',
    photos: [],

    connected: false
  });

  loadFBSdk();
};

function setupListeners () {
  window.FB.Event.subscribe("auth.authResponseChange", (response) => {
    onAuthStatusChanged(response);
  });

  subscribe('store:facebook:profile', () => {
    if (FBProfile.connected) {
      getProfile();
    }
  });
}

export function checkStatus () {
  window.FB.getLoginStatus((response) => {
    onAuthStatusChanged(response);
  });
}

function onAuthStatusChanged (response) {
  switch (response.status) {
    case 'connected':
      FBProfile.connected = true;
    break;
    case 'not_authorized':
    case 'unknown':
      FBProfile.connected = false;
    break;
  }

  saveProfile();
}

export function getProfile () {
  FB.api("/me", "get", {}, (result) => {
    if (result.error) { navigate(''); }

    FBProfile['id']         = result.id;
    FBProfile['name']       = result.name;

    saveProfile();
  });
}

export function getPhotos() {
  FB.api('me/photos', "get", {}, (result) => {
    if (result.error) {
      console.error('Facebook: can\'t load photos');
      return;
    }
    let photos = result.data;

    for (let p of photos) {
      if (p.images && (p.images.length > 0)){
        FBProfile.photos.push({ url: p.images[0].source });
      }
    }

    saveProfile();
  });
}

function setFBConfig () {
  window.FB.init({
    appId : '293516484105634',
    status: true, // check login status
    cookie: true, // enable cookies to allow the server to access the session
    xfbml : true,  // parse XFBML
    version: 'v2.3'
  });
}

function loadFBSdk () {
  window.fbAsyncInit = function () {
    onFBSdkLoaded()
  };

  (function (d) {
    let js;
    let id = 'facebook-jssdk';
    if (d.getElementById(id)) { return; }
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = '//connect.facebook.net/en_US/all.js';
    d.getElementsByTagName('head')[0].appendChild(js);
  }(document));
}

function onFBSdkLoaded () {
  setFBConfig();
  setupListeners();
  checkStatus();
}
