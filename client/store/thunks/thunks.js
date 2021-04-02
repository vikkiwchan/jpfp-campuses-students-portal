import axios from 'axios';
import actionCreators from '../actionCreators/actionCreators';

export const fetchCampuses = (id) => {
  id = id || 1;
  return async (dispatch) => {
    try {
      const { rows } = (await axios.get(`/api/campuses?page=${id}`)).data;
      dispatch(actionCreators.loadCampuses(rows));
    } catch (err) {
      console.error(err);
    }
  };
};

export const fetchStudents = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/students');
      dispatch(actionCreators.loadStudents(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const createCampus = (campus, history) => {
  return async (dispatch) => {
    const { data } = await axios.post('/api/campuses', campus);
    dispatch(actionCreators._createCampus(data));
    history.push('/campuses');
  };
};

export const deleteCampus = (id, history) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/campuses/${id}`);
      dispatch(actionCreators._deleteCampus(id));
      if (history) {
        history.push('/campuses');
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateCampus = (id, campus, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/campuses/${id}`, campus);
      dispatch(actionCreators._updateCampus(data));
      history.push(`/campuses`);
    } catch (err) {
      console.error(err);
    }
  };
};

export const fetchCampus = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`./api/campuses/${id}`);
      dispatch(actionCreators.selectCampus(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const fetchStudent = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/students/${id}`);
      dispatch(actionCreators.selectStudent(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const createStudent = (student, history) => {
  return async (dispatch) => {
    const { data } = await axios.post('/api/students', student);
    dispatch(actionCreators._createStudent(data));
    history.push('/students');
  };
};

export const deleteStudent = (id, history) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/students/${id}`);
      dispatch(actionCreators._deleteStudent(id));
      if (history) {
        history.push('/students');
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateStudent = (id, student, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/students/${id}`, student);
      dispatch(actionCreators._updateStudent(data));
      if (history) {
        history.push(`/students/${id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export const unregisterStudent = (id, student) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/students/${id}`, student);
      dispatch(actionCreators._unregisterStudent(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const sortLastName = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/students/sort/byLastName');
      dispatch(actionCreators._sortLastName(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const sortGpa = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/students/sort/byGpa');
      dispatch(actionCreators._sortGpa(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const sortCampusesByStudents = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/campuses/sort/byStudents');
      dispatch(actionCreators._sortCampusesByStudents(data));
    } catch (err) {
      console.error(err);
    }
  };
};
