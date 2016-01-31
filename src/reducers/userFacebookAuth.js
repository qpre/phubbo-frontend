import * as Actions from '../actions/social/facebook';

const defaultState = {
  isSDKLoaded:  false,
  isFetching:   false,
  isAuthorized: false,
  authResponse: null,
};

export default function facebookAuthorization(state = defaultState, action) {
  switch (action.type) {
    case Actions.SDK_LOADING:
      return {
        ...state,
        isFetching: true,
      };

    case Actions.SDK_LOADED:
      return {
        ...state,
        isSDKLoaded: true,
      };

    case Actions.AUTHORIZING:
      return {
        ...state,
        isFetching: true,
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

    default:
      return state;
  }
}
