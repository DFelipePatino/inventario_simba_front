// store.js
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Use named import
import rootReducer from './reducer'; // Adjust the path as necessary

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;