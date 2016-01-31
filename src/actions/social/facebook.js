import config from '../../config/config.js';

export const SDK_NOT_LOADED = 'SDK_NOT_LOADED';
export const SDK_LOADING    = 'SDK_LOADING';
export const SDK_LOADED     = 'SDK_LOADED';

export const AUTH_UNKNOWN   = 'AUTH_UNKNOWN';
export const AUTH_CHECKING  = 'AUTH_CHECKING';
export const AUTH_OK        = 'AUTH_OK';
export const AUTHORIZING    = 'AUTHORIZING';
export const AUTH_KO        = 'AUTH_KO';

function shouldInitSDK(state) {
  return !state.facebookAuthorization.isSDKLoaded;
}

function initSDK(onSdkInit = null) {
  return dispatch => {
    dispatch({ type: SDK_LOADING });

    window.fbAsyncInit = function () {
      window.FB.init({
        appId      : config.facebook.appId,
        xfbml      : true,
        version    : 'v2.5',
      });

      dispatch({ type: SDK_LOADED });
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
  };
}

function authorized(authResponse) {
  return {
    type:         AUTH_OK,
    authResponse,
  };
}

function checkAuthorization() {
  return dispatch => {
    window.FB.getLoginStatus(response => {
      if (response.status === 'connected') {
        // the user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token
        // and signed request each expire
        dispatch(authorized(response.authResponse));
      } else if (response.status === 'not_authorized') {
        // the user is logged in to Facebook,
        // but has not authenticated your app
        dispatch({ type: AUTH_KO });
      } else {
        // the user isn't logged in to Facebook.
        dispatch({ type: AUTH_KO });
      }
    });
  };
}

export function authorize() {
  return (dispatch, getState) => {
    const state = getState();

    function onSdkInit() {
      dispatch({ type: AUTHORIZING });
      dispatch(checkAuthorization());
    }

    if (shouldInitSDK(state)) {
      dispatch(initSDK(onSdkInit));
      return;
    }

    onSdkInit();
  };
}
