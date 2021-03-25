import axios from 'axios';
import {
  loadCampuses,
  _createCampus,
  _deleteCampus,
  _updateCampus,
  selectCampus,
  selectStudent,
  loadStudents,
  _createStudent,
  _deleteStudent,
  _updateStudent,
} from '../actionCreators/actionCreators';

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

export const deleteCampus = (id, history) => {
  return async (dispatch) => {
    try {
      console.log('HEY');
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

export const updateCampus = (id, campus, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/campuses/${id}`, campus);
      dispatch(_updateCampus(data));
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
      dispatch(selectCampus(data));
    } catch (err) {
      console.error(err);
    }
  };
};

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

export const updateStudent = (id, student) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/students/${id}`, student);
      dispatch(_updateStudent(data));
    } catch (err) {
      console.error(err);
    }
  };
};
