import {
  LOAD_CAMPUSES,
  CREATE_CAMPUS,
  DELETE_CAMPUS,
  UPDATE_CAMPUS,
  UNREGISTER_STUDENT,
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
    case UNREGISTER_STUDENT:
      return state.map((campus) => {
        let students = campus.students;
        let index;
        students.forEach((student, idx) => {
          if (student.id === action.student.id) {
            index = idx;
          }
        });
        if (index !== undefined) {
          students.splice(index, 1);
          return { ...campus, students };
        } else {
          return campus;
        }
      });
    default:
      return state;
  }
};
