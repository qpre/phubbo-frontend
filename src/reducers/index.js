import { combineReducers } from 'redux';
import router from './router';
import auth from './auth';
import facebookAuthorization from './userFacebookAuth.js';

const rootReducer = combineReducers({
  router,
  auth,
  facebookAuthorization,
});

export default rootReducer;
