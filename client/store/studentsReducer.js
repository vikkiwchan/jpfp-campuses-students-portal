import axios from 'axios';

const LOAD_STUDENTS = 'LOAD_STUDENTS';

const loadStudents = (students) => ({
  type: LOAD_STUDENTS,
  students,
});

export const fetchStudents = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/students');
      dispatch(loadStudents(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_STUDENTS:
      return action.students;
    default:
      return state;
  }
};
