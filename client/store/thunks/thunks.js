import axios from 'axios';
import actionCreators from '../actionCreators/actionCreators';

export const fetchCampuses = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/campuses');
      dispatch(actionCreators.loadCampuses(data));
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
    try {
      const { data } = await axios.post('/api/campuses', campus);
      dispatch(actionCreators._createCampus(data));
      history.push('/campuses');
    } catch (err) {
      console.error(err);
    }
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
    try {
      const { data } = await axios.post('/api/students', student);
      dispatch(actionCreators._createStudent(data));
      history.push('/students');
    } catch (err) {
      console.error(err);
    }
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
      const { data } = await axios.get('/api/students/byLastName');
      dispatch(actionCreators._sortLastName(data));
    } catch (err) {
      console.error(err);
    }
  };
};
