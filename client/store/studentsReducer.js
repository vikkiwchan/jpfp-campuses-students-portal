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

const CREATE_STUDENT = 'CREATE_STUDENT';

const _createStudent = (student) => ({
  type: CREATE_STUDENT,
  student,
});

export const createStudent = (student, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/students', student);
      dispatch(_createStudent(data));
      history.push('/students');
    } catch (err) {
      console.error(err);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_STUDENTS:
      return action.students;
    case CREATE_STUDENT:
      return [...state, action.student];
    default:
      return state;
  }
};
