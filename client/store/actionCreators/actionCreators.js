import {
  LOAD_CAMPUSES,
  CREATE_CAMPUS,
  DELETE_CAMPUS,
  UPDATE_CAMPUS,
  SELECT_CAMPUS,
  SELECT_STUDENT,
  LOAD_STUDENTS,
  CREATE_STUDENT,
  DELETE_STUDENT,
  UPDATE_STUDENT,
  UNREGISTER_STUDENT,
  SET_VISIBILITY_FILTER,
} from '../actionConstants/actions';

export const loadCampuses = (campuses) => ({
  type: LOAD_CAMPUSES,
  campuses,
});

export const _createCampus = (campus) => ({
  type: CREATE_CAMPUS,
  campus,
});

export const _deleteCampus = (id) => ({
  type: DELETE_CAMPUS,
  id,
});

export const _updateCampus = (campus) => ({
  type: UPDATE_CAMPUS,
  campus,
});

export const selectCampus = (campus) => ({
  type: SELECT_CAMPUS,
  campus,
});

export const selectStudent = (student) => ({
  type: SELECT_STUDENT,
  student,
});

export const loadStudents = (students) => ({
  type: LOAD_STUDENTS,
  students,
});

export const _createStudent = (student) => ({
  type: CREATE_STUDENT,
  student,
});

export const _deleteStudent = (id) => ({
  type: DELETE_STUDENT,
  id,
});

export const _updateStudent = (student) => ({
  type: UPDATE_STUDENT,
  student,
});

export const _unregisterStudent = (student) => ({
  type: UNREGISTER_STUDENT,
  student,
});

export const setVisibilityFilter = (visFilter) => ({
  type: SET_VISIBILITY_FILTER,
  visFilter,
});
