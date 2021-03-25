import {
  LOAD_CAMPUSES,
  CREATE_CAMPUS,
  DELETE_CAMPUS,
  UPDATE_CAMPUS,
} from '../actionConstants/actions';

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_CAMPUSES:
      return action.campuses;
    case CREATE_CAMPUS:
      return [...state, action.campus];
    case DELETE_CAMPUS:
      return state.filter((campus) => campus.id !== action.id);
    case UPDATE_CAMPUS:
      return state.map((campus) =>
        campus.id !== action.campus.id ? campus : action.campus
      );
    default:
      return state;
  }
};
