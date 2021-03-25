import React from 'react';
import { connect } from 'react-redux';
import { deleteCampus } from '../store/thunks/thunks';

const DeleteCampusButton = (props) => {
  console.log('----> called from DeleteCampusButton', props);
  return <button onClick={() => deleteCampus(id)}>x</button>;
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    deleteCampus: (id) => dispatch(deleteCampus(id, history)),
  };
};

export default connect(null, mapDispatchToProps)(DeleteCampusButton);
