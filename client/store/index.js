import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import campusesReducer from './reducers/campusesReducer';
import studentsReducer from './reducers/studentsReducer';
import singleCampusReducer from './reducers/singleCampusReducer';
import singleStudentReducer from './reducers/singleStudentReducer';
import visibilityFilterReducer from './reducers/visibilityFilterReducer';

const store = createStore(
  combineReducers({
    campuses: campusesReducer,
    students: studentsReducer,
    campus: singleCampusReducer,
    student: singleStudentReducer,
    visFilter: visibilityFilterReducer,
  }),
  applyMiddleware(thunk, logger)
);

export default store;
