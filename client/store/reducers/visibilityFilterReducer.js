const initialState = {
  campuses: 'SHOW_ALL',
  students: 'SHOW_ALL',
};

//if state of campus list changes, force a re-render or create a new page

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return { ...state, ...action.visFilter };
    default:
      return state;
  }
};
