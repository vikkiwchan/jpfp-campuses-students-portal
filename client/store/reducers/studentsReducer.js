export default (state = [], action) => {
  switch (action.type) {
    case 'LOAD_STUDENTS':
      return action.students;
    case 'CREATE_STUDENT':
      return [...state, action.student];
    case 'DELETE_STUDENT':
      return state.filter((student) => student.id !== action.id);
    case 'UPDATE_STUDENT':
      return state.map((student) =>
        student.id === action.student.id ? action.student : student
      );
    case 'DELETE_CAMPUS':
      return state.map((student) => {
        if (student.campusId === action.id) {
          student.campusId = null;
        }
        return student;
      });
    case 'UNREGISTER_STUDENT':
      return state.map((student) => {
        if (student.id === action.student.id) {
          return action.student;
        }
        return student;
      });
    case 'SORT_LAST_NAME':
      return action.students;
    default:
      return state;
  }
};
