import axios from 'axios';
import actionCreators from '../actionCreators/actionCreators';

export const fetchCampuses = (page, visFilter) => {
  return async (dispatch) => {
    try {
      page = page || 1;
      let data;
      if (visFilter === 'SHOW_ALL' || !visFilter) {
        const { rows } = (await axios.get(`/api/campuses?page=${page}`)).data;
        data = rows;
      }
      if (visFilter === 'SHOW_UNREGISTERED') {
        const { rows } = (
          await axios.get(`/api/campuses/noRegisteredStudents?page=${page}`)
        ).data;
        data = rows;
      }
      if (visFilter === 'SHOW_BY_STUDENTCOUNT') {
        const { rows } = (
          await axios.get(`/api/campuses/sortByStudents?page=${page}`)
        ).data;
        data = rows;
      }
      dispatch(actionCreators.loadCampuses(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const getCampusesPageCount = async (page, visFilter) => {
  try {
    let data;
    if (visFilter === 'SHOW_ALL' || !visFilter) {
      const { count } = (await axios.get(`/api/campuses?page=${page}`)).data;
      data = count;
    }
    if (visFilter === 'SHOW_UNREGISTERED') {
      const { count } = (
        await axios.get(`/api/campuses/noRegisteredStudents?page=${page}`)
      ).data;
      data = count;
    }
    if (visFilter === 'SHOW_BY_STUDENTCOUNT') {
      const { count } = (
        await axios.get(`/api/campuses/sortByStudents?page=${page}`)
      ).data;
      data = count;
    }
    return Math.ceil(data / 10);
  } catch (err) {
    console.error(err);
  }
};

// export const fetchStudents = () => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.get('/api/students');
//       dispatch(actionCreators.loadStudents(data));
//     } catch (err) {
//       console.error(err);
//     }
//   };
// };

export const fetchStudents = (page, visFilter) => {
  return async (dispatch) => {
    try {
      page = page || 1;
      let data;
      if (visFilter === 'SHOW_ALL' || !visFilter) {
        const { rows } = (await axios.get(`/api/students?page=${page}`)).data;
        data = rows;
      }
      if (visFilter === 'SHOW_UNREGISTERED') {
        const { rows } = (
          await axios.get(`/api/students/unregistered?page=${page}`)
        ).data;
        data = rows;
      }
      if (visFilter === 'SORT_BY_GPA') {
        const { rows } = (
          await axios.get(`/api/students/sortByGpa?page=${page}`)
        ).data;
        data = rows;
      }
      if (visFilter === 'SORT_BY_LASTNAME') {
        const { rows } = (
          await axios.get(`/api/students/sortByLastName?page=${page}`)
        ).data;
        data = rows;
      }
      dispatch(actionCreators.loadStudents(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const getStudentsPageCount = async (page, visFilter) => {
  try {
    let data;
    if (visFilter === 'SHOW_ALL' || !visFilter) {
      const { count } = (await axios.get(`/api/students?page=${page}`)).data;
      data = count;
    }
    if (visFilter === 'SHOW_UNREGISTERED') {
      const { count } = (
        await axios.get(`/api/students/unregistered?page=${page}`)
      ).data;
      data = count;
    }
    if (visFilter === 'SORT_BY_GPA') {
      const { count } = (
        await axios.get(`/api/students/sortByGpa?page=${page}`)
      ).data;
      data = count;
    }
    if (visFilter === 'SORT_BY_LASTNAME') {
      const { count } = (
        await axios.get(`/api/students/sortByLastName?page=${page}`)
      ).data;
      data = count;
    }
    return Math.ceil(data / 10);
  } catch (err) {
    console.error(err);
  }
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
        history.push('/campuses'); // create a delete view
      }
    } catch (err) {
      console.error(err);
      alert('Cannot delete a campus with registered students');
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
      const singleStudent = (await axios.get(`/api/students/${id}`)).data;
      dispatch(actionCreators.selectStudent(singleStudent));
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
