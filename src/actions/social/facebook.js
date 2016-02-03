import config from '../../config/config.js';

export const SDK_NOT_LOADED = 'SDK_NOT_LOADED';
export const SDK_LOADING    = 'SDK_LOADING';
export const SDK_LOADED     = 'SDK_LOADED';

export const AUTH_UNKNOWN   = 'AUTH_UNKNOWN';
export const AUTH_CHECKING  = 'AUTH_CHECKING';
export const AUTH_OK        = 'AUTH_OK';
export const AUTHORIZING    = 'AUTHORIZING';
export const AUTH_KO        = 'AUTH_KO';

export const FB_PHOTOS_LOADED = 'FB_PHOTOS_LOADED';

let sdkReadyQueue = [];

function initSDK(onSdkInit = null) {
  window.fbAsyncInit = function () {
    window.FB.init({
      appId      : config.facebook.appId,
      xfbml      : true,
      version    : 'v2.3',
    });

    if (onSdkInit) { onSdkInit(); }
  };

  /*eslint-disable */
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
   /*eslint-enable */
}

function onSDKLoaded(callback) {
  return (dispatch, getState) => {
    const { facebookAuthorization } = getState();

    if (facebookAuthorization.isSDKLoaded) {
      callback();
      return;
    }

    sdkReadyQueue.push(callback);

    if (facebookAuthorization.isSDKLoading) {
      return;
    }

    dispatch({ type: SDK_LOADING });

    function onSdkInit() {
      dispatch({ type: SDK_LOADED });

      for (const cb of sdkReadyQueue) {
        cb();
      }

      sdkReadyQueue = [];
    }

    initSDK(onSdkInit);
  };
}

let onAuthReadyStack = [];

function authorized(authResponse) {
  return {
    type:         AUTH_OK,
    authResponse,
  };
}

function checkAuthorization(onAuthOK = null, onAuthKO = null) {
  window.FB.getLoginStatus(response => {
    if (response.status === 'connected') {
      // the user is logged in and has authenticated your
      // app, and response.authResponse supplies
      // the user's ID, a valid access token, a signed
      // request, and the time the access token
      // and signed request each expire
      onAuthOK(response.authResponse);
    } else if (response.status === 'not_authorized') {
      // the user is logged in to Facebook,
      // but has not authenticated your app
      if (onAuthKO) { onAuthKO(); }
    } else {
      // the user isn't logged in to Facebook.
      if (onAuthKO) { onAuthKO(); }
    }
  });
}

export function onAuthReady(callback = null) {
  return (dispatch, getState) => {
    const { facebookAuthorization } = getState();

    if (!facebookAuthorization.isSDKLoaded) {
      return dispatch(onSDKLoaded(() => {
        dispatch(onAuthReady(callback));
      }));
    }

    if (facebookAuthorization.isAuthorized) {
      if (callback) { callback(); }
      return;
    }

    if (callback) { onAuthReadyStack.push(callback); }

    if (facebookAuthorization.isFetching) {
      return;
    }

    dispatch({ type: AUTHORIZING });

    function onAuthOK() {
      dispatch({ type: AUTH_OK });

      for (const cb of onAuthReadyStack) {
        cb();
      }

      onAuthReadyStack = [];
    }

    function onAuthKO(authResponse) {
      dispatch(authorized(authResponse));
    }

    checkAuthorization(onAuthOK, onAuthKO);
  };
}

function photosLoaded(photos) {
  return {
    type: FB_PHOTOS_LOADED,
    photos,
  };
}

export function getPhotos() {
  return (dispatch) => {
    function authReady() {
      window.FB.api('me/photos', 'get', {}, (result) => {
        if (result.error) {
          console.error('Facebook: can\'t load photos');
          return;
        }

        const photosRaw = result.data;
        const photos = [];

        for (const p of photosRaw) {
          if (p.images && (p.images.length > 0)) {
            photos.push({
              id: p.id,
              urlLarge: p.images[0].source,
              urlSmall: p.images[p.images.length - 1].source,
            });
          }
        }

        dispatch(photosLoaded(photos));
      });
    }

    return dispatch(onAuthReady(authReady));
  };
}

export function authorize() {
  return onAuthReady();
}
