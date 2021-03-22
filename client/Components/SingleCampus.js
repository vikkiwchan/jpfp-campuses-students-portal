import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampus } from '../store/singleCampusReducer';
import { Link } from 'react-router-dom';

class SingleCampus extends Component {
  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.campusId);
  }
  render() {
    const { campus } = this.props;
    let { name, imageUrl, description, address, students } = campus;
    students = students || [];
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
          <button>edit</button>
          <button>delete</button>
        </div>
        <div>
          <h3>Students on Campus</h3>
          <div id='all-students' className='grid-container'>
            {students.length === 0 ? (
              <p>No students on this campus</p>
            ) : (
              students.map((student) => (
                <Link to={`/students/${student.id}`} key={student.id}>
                  <div key={student.id} className='grid-item-student'>
                    <img src={student.imageUrl} className='portrait' />
                    <h2>{student.fullName}</h2>
                  </div>
                </Link>
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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampus(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
