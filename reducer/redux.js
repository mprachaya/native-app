const Reducer = (state, action) => {
  switch (action.type) {
    case 'GET_PATHNAME':
      return state.pathname;
    case 'SET_PATHNAME':
      return { ...state, pathname: action.payload };
    default:
      return state;
  }
};
export default Reducer;
