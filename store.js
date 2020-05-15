import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import createDebounce from 'redux-debounced';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';


const initialState = {};
const isRemoteDebugging = (typeof atob !== 'undefined');

const middleware = [createDebounce(), thunk];

if (process.env.NODE_ENV === 'development' && isRemoteDebugging) {
  const logger = createLogger({
    collapsed: true,
  });
  middleware.push(logger);
}

const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers,
);

export default store;
