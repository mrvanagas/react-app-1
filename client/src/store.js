import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'thunk';

import locationReducer from './features/locations'
 
const middleware = [thunk];

const reducer = combineReducers({
    locations: locationReducer
})

const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;