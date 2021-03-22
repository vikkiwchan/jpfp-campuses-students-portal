import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import campusesReducer from './campusesReducer';
import studentsReducer from './studentsReducer';
import singleCampusReducer from './singleCampusReducer';
import singleStudentReducer from './singleStudentReducer';

const store = createStore(
  combineReducers({
    campuses: campusesReducer,
    students: studentsReducer,
    campus: singleCampusReducer,
    student: singleStudentReducer,
  }),
  applyMiddleware(thunk, logger)
);

export default store;
