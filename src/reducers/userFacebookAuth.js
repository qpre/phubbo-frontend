import * as Actions from '../actions/social/facebook';

const defaultState = {
  isSDKLoading: false,
  isSDKLoaded:  false,
  isFetching:   false,
  isAuthorized: false,
  authResponse: null,
  photos: [],
};

export default function facebookAuthorization(state = defaultState, action) {
  switch (action.type) {
    case Actions.SDK_LOADING:
      return {
        ...state,
        isSDKLoading: true,
        isSDKLoaded:  false,
      };

    case Actions.SDK_LOADED:
      return {
        ...state,
        isSDKLoading: false,
        isSDKLoaded:  true,
      };

    case Actions.AUTHORIZING:
      return {
        ...state,
        isFetching:   true,
        isAuthorized: false,
      };

    case Actions.AUTH_OK:
      return {
        ...state,
        isFetching:   false,
        isAuthorized: true,
        authResponse: action.authResponse,
      };

    case Actions.AUTH_KO:
      return {
        ...state,
        isFetching:   false,
        isAuthorized: false,
        authResponse: null,
      };

    case Actions.FB_PHOTOS_LOADED:
      return {
        ...state,
        photos: action.photos,
      };

    default:
      return state;
  }
}
