import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

const createStoreWithMiddleWare = applyMiddleware(
  thunk,
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleWare(rootReducer, initialState);
}
