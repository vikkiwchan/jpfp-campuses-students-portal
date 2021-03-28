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

const setVisibilityFilter = (visFilter) => ({
  type: actionTypes.SET_VISIBILITY_FILTER,
  visFilter,
});

const _sortLastName = (students) => ({
  type: actionTypes.SORT_LAST_NAME,
  students,
});

const _sortGpa = (students) => ({
  type: actionTypes.SORT_GPA,
  students,
});

const _sortCampusesByStudents = (campuses) => ({
  type: actionTypes.SORT_CAMPUS_STUDENTS,
  campuses,
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
  setVisibilityFilter,
  _sortLastName,
  _sortGpa,
  _sortCampusesByStudents,
};

export default actionCreators;
