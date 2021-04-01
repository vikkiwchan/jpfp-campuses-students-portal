import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampus, deleteCampus } from '../store/thunks/thunks';
import { Link } from 'react-router-dom';
import Student from './Student';

class SingleCampus extends Component {
  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.campusId);
  }
  render() {
    const { campus, deleteCampus } = this.props;
    let { id, name, imageUrl, description, address, students } = campus;
    students = students || [];
    if (!campus.id) {
      return '... loading campus data';
    }
    return (
      <div id='single-campus'>
        <div className='row-info'>
          <img src={imageUrl} />
          <div>
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
        </div>
        <div className='row-info'>
          <p>{address}</p>
          <Link to={`/campuses/edit-campus/${id}`}>
            <button>edit</button>
          </Link>
          <button onClick={() => deleteCampus(id)}>delete</button>
        </div>
        <div>
          <h3>Students on Campus</h3>
          <div id='all-students' className='grid-container'>
            {students.length === 0 ? (
              <p>No students are registered to this campus</p>
            ) : (
              students.map((student) => (
                <Student student={student} key={student.id} />
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    campus: state.campus,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampus(id)),
    deleteCampus: (id) => dispatch(deleteCampus(id, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
