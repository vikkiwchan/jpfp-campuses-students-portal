import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import Student from './Student';
import NotFound from './NotFound';
import { fetchCampus, deleteCampus } from '../store/thunks/thunks';

class SingleCampus extends Component {
  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.campusId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.campusId !== this.props.match.params.campusId) {
      this.props.fetchCampus(this.props.match.params.campusId);
    }
  }

  render() {
    let { campus, deleteCampus } = this.props;
    campus = campus || {};
    let { id, name, imageUrl, description, address, students } = campus;
    students = students || [];

    if (!campus.id) {
      return <NotFound />;
    }
    return (
      <div className='component-container'>
        <div className='body-info'>
          <img className='single-view' src={imageUrl} />
          <h1>{name}</h1>
          <p>{description}</p>
          <p>{address}</p>
          <div className='button-set'>
            <div className='left-button'>
              <Button variant='contained' color='primary' size='medium'>
                <Link to={`/campuses/edit-campus/${id}`}>edit</Link>
              </Button>
            </div>
            <div className='right-button'>
              <Button
                variant='contained'
                color='primary'
                size='medium'
                onClick={() => {
                  deleteCampus(id);
                }}
              >
                delete
              </Button>
            </div>
          </div>
        </div>
        <div>
          <h2>Students on Campus</h2>
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

const mapStateToProps = (state, otherProps) => {
  return {
    campus: state.singleCampus,
    otherProps,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampus(id)),
    deleteCampus: (id) => dispatch(deleteCampus(id, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
