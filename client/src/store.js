import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import locationsReducer from './features/locations';
import coursesReducer from './features/courses';

const middleware = [thunk];

const reducer = combineReducers({
  locations: locationsReducer,
  courses: coursesReducer
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;