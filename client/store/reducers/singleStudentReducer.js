export default (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_STUDENT':
      return action.student;
    default:
      return state;
  }
};
