import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCampus } from '../store/thunks/thunks';
import Paper from '@material-ui/core/Paper';

const Campus = ({ campus, deleteCampus }) => {
  const buttonsView = campus.campusListView ? (
    <div>
      <Link to={`/campuses/edit-campus/${campus.id}`}>
        <button>edit</button>
      </Link>
      <button onClick={() => deleteCampus(campus.id)}>delete</button>
    </div>
  ) : (
    <></>
  );
  return (
    <Paper>
      <div className='card'>
        <img id='campus-card-img' src={campus.imageUrl} />
        <div>
          <Link to={`/campuses/${campus.id}`} key={campus.id}>
            <h2>{campus.name}</h2>
          </Link>
          <p>
            {campus.students
              ? `Students (${campus.students.length})`
              : 'No students'}
          </p>
          {buttonsView}
        </div>
      </div>
    </Paper>
  );
};

const mapStateToProps = (state, otherProps) => {
  return {
    campus: otherProps.campus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCampus: (id) => dispatch(deleteCampus(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campus);
