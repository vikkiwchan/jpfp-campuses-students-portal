import { SET_VISIBILITY_FILTER } from '../actionConstants/actions';

const SHOW_ALL = 'SHOW_ALL';
const SHOW_UNREGISTERED = 'SHOW_UNREGISTERED';

export default (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.visFilter;
    default:
      return state;
  }
};
