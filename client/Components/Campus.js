import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { deleteCampus } from '../store/thunks/thunks';

const Campus = ({ campus, deleteCampus }) => {
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
          {campus.campusListView ? (
            <div className='button-set'>
              <div className='left-button'>
                <Button variant='contained' color='secondary' size='small'>
                  <Link to={`/campuses/edit-campus/${campus.id}`}>edit</Link>
                </Button>
              </div>
              <div className='right-button'>
                <Button
                  variant='contained'
                  color='secondary'
                  size='small'
                  onClick={() => {
                    deleteCampus(campus.id);
                  }}
                >
                  delete
                </Button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Paper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCampus: (id) => dispatch(deleteCampus(id)),
  };
};

export default connect(null, mapDispatchToProps)(Campus);
