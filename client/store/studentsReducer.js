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

const DELETE_STUDENT = 'DELETE_STUDENT';

const _deleteStudent = (id) => ({
  type: DELETE_STUDENT,
  id,
});

export const deleteStudent = (id, history) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/students/${id}`);
      if (history) {
        history.push('/students');
      }
      dispatch(_deleteStudent(id));
    } catch (err) {
      console.error(err);
    }
  };
};

export const UPDATE_STUDENT = 'UPDATE_STUDENT';

export const _updateStudent = (student) => ({
  type: UPDATE_STUDENT,
  student,
});

export const updateStudent = (id, student, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/students/${id}`, student);
      dispatch(_updateStudent(data));
      history.push(`/campuses/${id}`);
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
    case DELETE_STUDENT:
      return state.filter((student) => student.id !== action.id);
    case UPDATE_STUDENT:
      return state.map((student) =>
        student.id === action.student.id ? action.student : student
      );
    default:
      return state;
  }
};
