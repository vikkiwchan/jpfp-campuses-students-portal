export default (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_CAMPUS':
      return action.campus;
    case 'UNREGISTER_STUDENT':
      const campusStudents = state.students.filter(
        (student) => student.id !== action.student.id
      );
      return { ...state, students: campusStudents };
    case 'UPDATE_CAMPUS':
      return action.campus;
    default:
      return state;
  }
};
