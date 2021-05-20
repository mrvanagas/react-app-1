import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import locationsReducer from './features/locations';
import authReducer from './features/auth';

const middleware = [thunk];

const reducer = combineReducers({
  locations: locationsReducer,
  auth: authReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;