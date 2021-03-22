import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import campusesReducer from './campusesReducer.js';
import studentsReducer from './studentsReducer.js';

const store = createStore(
  combineReducers({ campuses: campusesReducer, students: studentsReducer }),
  applyMiddleware(thunk, logger)
);

export default store;
