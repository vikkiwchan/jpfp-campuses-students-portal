import {
  LOAD_STUDENTS,
  CREATE_STUDENT,
  DELETE_STUDENT,
  UPDATE_STUDENT,
  DELETE_CAMPUS,
} from '../actionConstants/actions';

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_STUDENTS:
      return action.students;
    case CREATE_STUDENT:
      return [...state, action.student];
    case DELETE_STUDENT:
      return state.filter((student) => student.id !== action.id);
    case UPDATE_STUDENT:
      return state.map((student) =>
        student.id === action.student.id ? action.student : student
      );
    case DELETE_CAMPUS:
      return state.map((student) => {
        if (student.campusId === action.id) {
          student.campusId = null;
        }
        return student;
      });
    default:
      return state;
  }
};
