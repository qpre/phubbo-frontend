import fetch from 'isomorphic-fetch';
import { post } from '../utils/network';
import { navigate } from '../utils/router';

export const CHECK_AUTH = 'CHECK_AUTH';
export const LOGGED_IN  = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const LOG_IN     = 'LOGIN';
export const LOG_OUT    = 'LOGOUT';

function requestLogin(credentials) {
  return {
    type: LOG_IN,
    credentials,
  };
}

export function requestLogout() {
  return {
    type: LOG_OUT,
    credentials,
  };
}

function loggedIn(json) {
  return {
    type:       LOGGED_IN,
    userData:   json.data,
    receivedAt: Date.now(),
  };
}

function loggedOut(json) {
  return {
    type:       LOGGED_OUT,
    receivedAt: Date.now(),
  };
}

export function logIn(credentials) {
  return dispatch => {
    dispatch(requestLogin(credentials));
    return post(`http://localhost:4080/api/auth/login`, credentials)
      .then(response  => {
        navigate('');
        dispatch(loggedIn(response));
      })
      .catch(response => dispatch(loggedOut()));
  };
}

export function isLoggedIn(state) {
  return state.isLoggedIn;
};

export function logOut() {
  return dispatch => {
    dispatch(requestLogout());
    return fetch(`http://localhost:4080/api/auth/logout`)
      .then(() => dispatch(loggedOut()));
  };
}
