const Reducer = (state, action) => {
  switch (action.type) {
    case 'GET_PATHNAME':
      return state.pathname;
    case 'SET_PATHNAME':
      return { ...state, pathname: action.payload };
    // customer page
    case 'GET_CTM_SORT_TYPE':
      return state.ctm_sort_type;
    case 'SET_CTM_SORT_TYPE':
      return { ...state, ctm_sort_type: action.payload };
    case 'GET_CTM_SORT_field':
      return state.ctm_sort_field;
    case 'SET_CTM_SORT_field':
      return { ...state, ctm_sort_field: action.payload };
    case 'GET_CTM_GROUP_FILTER':
      return state.ctm_group_filter;
    case 'SET_CTM_GROUP_FILTER':
      return { ...state, ctm_group_filter: action.payload };
    case 'GET_CTM_TERRITORY_FILTER':
      return state.ctm_territory_filter;
    case 'SET_CTM_TERRITORY_FILTER':
      return { ...state, ctm_territory_filter: action.payload };
    case 'GET_CTM_TYPE_FILTER':
      return state.ctm_type_filter;
    case 'SET_CTM_TYPE_FILTER':
      return { ...state, ctm_type_filter: action.payload };
    // customer page modal controller
    case 'GET_CTM_ADD_MODAL':
      return state.ctm_add_modal;
    case 'SET_CTM_ADD_MODAL':
      return { ...state, ctm_add_modal: action.payload };
    case 'GET_CTM_SORT_MODAL':
      return state.ctm_sort_modal;
    case 'SET_CTM_SORT_MODAL':
      return { ...state, ctm_sort_modal: action.payload };
    case 'GET_CTM_FILTER_MODAL':
      return state.ctm_filter_modal;
    case 'SET_CTM_FILTER_MODAL':
      return { ...state, ctm_filter_modal: action.payload };
    default:
      false;
      return state;
  }
};
export default Reducer;
