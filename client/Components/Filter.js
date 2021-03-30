import React from 'react';
import { connect } from 'react-redux';
import actionCreators from '../store/actionCreators/actionCreators';

const Filter = ({ filter, visFilter, view }) => {
  const label =
    view === 'campuses' ? 'No Registered Students' : 'Unregistered to a Campus';
  return (
    <div id='filter'>
      <label>
        <strong>Currently showing: </strong>
      </label>
      <a
        className={visFilter[view] === 'SHOW_ALL' ? 'selected' : ''}
        onClick={() => filter({ [view]: 'SHOW_ALL' })}
      >
        All
      </a>
      <a>{', '}</a>
      <a
        className={visFilter[view] === 'SHOW_UNREGISTERED' ? 'selected' : ''}
        onClick={() => filter({ [view]: 'SHOW_UNREGISTERED' })}
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
    filter: (visFilter) =>
      dispatch(actionCreators.setVisibilityFilter(visFilter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
