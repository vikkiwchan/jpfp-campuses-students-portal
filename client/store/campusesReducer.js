import axios from 'axios';

const LOAD_CAMPUSES = 'LOAD_CAMPUSES';

const loadCampuses = (campuses) => ({
  type: LOAD_CAMPUSES,
  campuses,
});

export const fetchCampuses = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/campuses');
      dispatch(loadCampuses(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_CAMPUSES:
      return action.campuses;
    default:
      return state;
  }
};
