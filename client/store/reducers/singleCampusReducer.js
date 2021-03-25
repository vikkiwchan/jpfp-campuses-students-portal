import { UPDATE_STUDENT, SELECT_CAMPUS } from '../actionConstants/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case SELECT_CAMPUS:
      return action.campus;
    case UPDATE_STUDENT:
      const campusStudents = state.students.filter(
        (student) => student.id !== action.student.id
      );
      return { ...state, students: campusStudents };
    default:
      return state;
  }
};
