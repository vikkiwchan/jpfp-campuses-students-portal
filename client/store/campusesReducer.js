import axios from 'axios';

// LOAD CAMPUSES
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

// CREATE CAMPUSES
const CREATE_CAMPUS = 'CREATE_CAMPUS';

const _createCampus = (campus) => ({
  type: CREATE_CAMPUS,
  campus,
});

export const createCampus = (campus, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/campuses', campus);
      dispatch(_createCampus(data));
      history.push('/campuses');
    } catch (err) {
      console.error(err);
    }
  };
};

// DELETE CAMPUS
const DELETE_CAMPUS = 'DELETE_CAMPUS';

const _deleteCampus = (id) => ({
  type: DELETE_CAMPUS,
  id,
});

export const deleteCampus = (id, history) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/campuses/${id}`);
      dispatch(_deleteCampus(id));
      if (history) {
        history.push('/campuses');
      }
    } catch (err) {
      console.error(err);
    }
  };
};

// REDUCER
export default (state = [], action) => {
  switch (action.type) {
    case LOAD_CAMPUSES:
      return action.campuses;
    case CREATE_CAMPUS:
      return [...state, action.campus];
    case DELETE_CAMPUS:
      return state.filter((campus) => campus.id !== action.id);
    default:
      return state;
  }
};
