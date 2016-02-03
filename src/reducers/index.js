import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import auth from './auth';
import facebookAuthorization from './userFacebookAuth.js';

const rootReducer = combineReducers({
  routing: routeReducer,
  auth,
  facebookAuthorization,
});

export default rootReducer;
