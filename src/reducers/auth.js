import * as Actions from '../actions/auth';

const defaultState = {
  isFetching: false,
  loggedIn:   false,
};

function auth(state = defaultState, action) {
  switch (action.type) {
    case Actions.LOGGED_IN:
      return {
        ...state,
        isFetching: false,
        loggedIn:   true,
      };

    case Actions.LOGGED_OUT:
      return {
        ...state,
        isFetching: false,
        loggedIn:   false,
      };

    case Actions.LOG_IN:
      return {
        ...state,
        isFetching: true,
      };

    case Actions.LOG_OUT:
      return {
        ...state,
        isFetching: true,
      };

    default:
      return state;
  }
}

export default auth;
