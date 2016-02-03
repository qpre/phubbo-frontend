import { createStore, applyMiddleware } from 'redux';
import { hashHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const storeThunkMiddleWare = applyMiddleware(thunk)(createStore);

export const history = hashHistory;

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(history);
const createWithMiddleware = applyMiddleware(reduxRouterMiddleware)(storeThunkMiddleWare);

function createStoreWithMiddlewares() {
  const store = createWithMiddleware(rootReducer);

  // Required for replaying actions from devtools to work
  reduxRouterMiddleware.listenForReplays(store);

  return store;
}

export const store = createStoreWithMiddlewares();
