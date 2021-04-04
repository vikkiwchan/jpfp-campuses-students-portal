import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';

import Student from './Student';
import { fetchStudents, getStudentsPageCount } from '../store/thunks/thunks';
// import Filter from './Filter';
//import SortStudents from './SortStudents';

const StudentsList = ({ students, fetchStudents }) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(11);
  const [visFilter, setVisFilter] = useState('SHOW_ALL');

  // load students based on filter or sort selection
  useEffect(async () => {
    console.log('----> useEffect1', visFilter);
    fetchStudents(page, visFilter);
    setCount(await getStudentsPageCount(page, visFilter));
    setVisFilter(visFilter);
  }, [visFilter, page]);

  useEffect(() => {
    console.log('----> useEffect2', visFilter);
    setPage(1);
  }, [visFilter]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleClick = (visFilter) => {
    console.log('----> handleClick', visFilter);
    setVisFilter(visFilter);
  };

  students = students || [];
  if (!students.length) {
    return <div>'Loading ...'</div>;
  }
  return (
    <>
      <h1>All Students</h1>
      <div id='campuses-visFilter'>
        <label>
          <strong>Currently showing:&nbsp;</strong>
        </label>
        <a
          className={visFilter === 'SHOW_ALL' ? 'selected' : ''}
          onClick={() => handleClick('SHOW_ALL')}
        >
          All
        </a>
        <br />
        <label>
          <strong>Sort by:&nbsp;</strong>
        </label>
        <a
          className={visFilter === 'SORT_BY_GPA' ? 'selected' : ''}
          onClick={() => handleClick('SORT_BY_GPA')}
        >
          GPA
        </a>
        <span>,&nbsp;</span>
        <a
          className={visFilter === 'SORT_BY_LASTNAME' ? 'selected' : ''}
          onClick={() => handleClick('SORT_BY_LASTNAME')}
        >
          Lastname
        </a>
        <br />
        <label>
          <strong>Filter:&nbsp;</strong>
        </label>
        <a
          className={visFilter === 'SHOW_UNREGISTERED' ? 'selected' : ''}
          onClick={() => handleClick('SHOW_UNREGISTERED')}
        >
          Unregistered to a Campus
        </a>
      </div>
      <br />
      <Link to='/students/add-student'>
        <button>Add Student</button>
      </Link>
      <div id='all-students' className='grid-container'>
        {students.map((student) => (
          <Student
            key={student.id}
            student={{ ...student, studentListView: true }}
          />
        ))}
      </div>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        shape='rounded'
        color='primary'
      />
    </>
  );
};

// const mapStateToProps = (state) => {
//   const allStudents = state.students;
//   const unregisteredStudents = state.students.filter(
//     (student) => student.campusId === null
//   );

//   const filterFunc = (state) => {
//     if (state.visFilter.students === 'SHOW_ALL') {
//       return allStudents;
//     }
//     if (state.visFilter.students === 'SHOW_UNREGISTERED') {
//       return unregisteredStudents;
//     }
//   };
//   return {
//     students: filterFunc(state),
//   };
// };
const mapStateToProps = (state) => {
  return {
    students: state.students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: (page, visFilter) =>
      dispatch(fetchStudents(page, visFilter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentsList);
