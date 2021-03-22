import axios from 'axios';

const SELECT_STUDENT = 'SELECT_STUDENT';

const selectStudent = (student) => ({
  type: SELECT_STUDENT,
  student,
});

export const fetchStudent = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/students/${id}`);
      dispatch(selectStudent(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case SELECT_STUDENT:
      return action.student;
    default:
      return state;
  }
};
