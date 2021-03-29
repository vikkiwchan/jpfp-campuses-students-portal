const initialState = {
  campuses: 'SHOW_ALL',
  students: 'SHOW_ALL',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return { ...state, ...action.visFilter };
    default:
      return state;
  }
};
