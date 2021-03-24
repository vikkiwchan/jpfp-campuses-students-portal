import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStudent } from '../store/singleStudentReducer';
import { deleteStudent } from '../store/studentsReducer';
import Campus from './Campus';

class SingleStudent extends Component {
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.studentId);
  }
  render() {
    const { student, deleteStudent } = this.props;
    const { fullName, gpa, imageUrl, email, id } = student;
    const campus = this.props.student.campus || {};
    return (
      <div id='single-student'>
        <div className='row-info'>
          <img src={imageUrl} />
          <div>
            <h2>{fullName}</h2>
            <p>{email}</p>
            <p>GPA: {gpa}</p>
            <button>edit</button>
            <button onClick={() => deleteStudent(id)}>delete</button>
          </div>
        </div>
        {campus.id ? (
          <>
            <p>This student is registered at {campus.name}</p>
            <Campus
              campusProps={{ campusId: campus.id, campusListView: false }}
            />
          </>
        ) : (
          <p>This student is not registered to a campus yet</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    student: state.student,
  };
};
const mapDispatchToProps = (dispatch, { history }) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudent(id)),
    deleteStudent: (id) => dispatch(deleteStudent(id, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
