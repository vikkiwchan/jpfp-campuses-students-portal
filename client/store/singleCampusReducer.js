import axios from 'axios';
import { UPDATE_STUDENT } from './studentsReducer';

const SELECT_CAMPUS = 'SELECT_CAMPUS';

const selectCampus = (campus) => ({
  type: SELECT_CAMPUS,
  campus,
});

export const fetchCampus = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`./api/campuses/${id}`);
      dispatch(selectCampus(data));
    } catch (err) {
      console.error(err);
    }
  };
};

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
