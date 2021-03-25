import { UNREGISTER_STUDENT, SELECT_CAMPUS } from '../actionConstants/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case SELECT_CAMPUS:
      return action.campus;
    case UNREGISTER_STUDENT:
      const campusStudents = state.students.filter(
        (student) => student.id !== action.student.id
      );
      return { ...state, students: campusStudents };
    default:
      return state;
  }
};
