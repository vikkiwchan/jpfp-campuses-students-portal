import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStudent } from '../store/singleStudentReducer';
import Campus from './Campus';
import { Link } from 'react-router-dom';

class SingleStudent extends Component {
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.studentId);
  }
  render() {
    // console.log('-----> called from SingleStudent:', this.props);
    const { student } = this.props;
    const { fullName, gpa, imageUrl, email } = student;
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
            <button>delete</button>
          </div>
        </div>
        {campus.id ? (
          <>
            <p>This student is registered at {campus.name}</p>
            <Link to={`/campuses/${campus.id}`} key={campus.id}>
              <Campus campus={campus} />
            </Link>
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
const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudent(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
