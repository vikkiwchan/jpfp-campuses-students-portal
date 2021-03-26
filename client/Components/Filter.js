import React from 'react';
import { connect } from 'react-redux';
import { setVisibilityFilter } from '../store/actionCreators/actionCreators';

const Filter = ({ filter, visFilter, view }) => {
  const label =
    view === 'campuses' ? 'No Registered Students' : 'Unregistered to a Campus';
  return (
    <div id='filter'>
      <label>Currently showing:</label>
      <a
        className={visFilter === 'SHOW_ALL' ? 'selected' : ''}
        onClick={() => filter('SHOW_ALL')}
      >
        All
      </a>
      <a
        className={visFilter === 'SHOW_UNREGISTERED' ? 'selected' : ''}
        onClick={() => filter('SHOW_UNREGISTERED')}
      >
        {label}
      </a>
    </div>
  );
};

const mapStateToProps = (state, otherProps) => {
  return {
    visFilter: state.visFilter,
    view: otherProps.view,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filter: (visFilter) => dispatch(setVisibilityFilter(visFilter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
