import actionTypes from '../actionConstants/actions';

const loadCampuses = (campuses) => ({
  type: actionTypes.LOAD_CAMPUSES,
  campuses,
});

const _createCampus = (campus) => ({
  type: actionTypes.CREATE_CAMPUS,
  campus,
});

const _deleteCampus = (id) => ({
  type: actionTypes.DELETE_CAMPUS,
  id,
});

const _updateCampus = (campus) => ({
  type: actionTypes.UPDATE_CAMPUS,
  campus,
});

const selectCampus = (campus) => ({
  type: actionTypes.SELECT_CAMPUS,
  campus,
});

const selectStudent = (student) => ({
  type: actionTypes.SELECT_STUDENT,
  student,
});

const loadStudents = (students) => ({
  type: actionTypes.LOAD_STUDENTS,
  students,
});

const _createStudent = (student) => ({
  type: actionTypes.CREATE_STUDENT,
  student,
});

const _deleteStudent = (id) => ({
  type: actionTypes.DELETE_STUDENT,
  id,
});

const _updateStudent = (student) => ({
  type: actionTypes.UPDATE_STUDENT,
  student,
});

const _unregisterStudent = (student) => ({
  type: actionTypes.UNREGISTER_STUDENT,
  student,
});

const actionCreators = {
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
  _unregisterStudent,
};

export default actionCreators;
