import axios from 'axios';

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
    default:
      return state;
  }
};
