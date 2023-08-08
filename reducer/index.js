import React, { createContext, useReducer } from 'react';
import Reducer from './redux';

const initialState = {
  pathname: '',
  // customer page
  customer: [],
  ctm_sort_type: 'desc',
  ctm_sort_field: 'creation',
  ctm_group_filter: '',
  ctm_territory_filter: '',
  ctm_type_filter: '',
  // customer page modal controller
  ctm_add_modal: false,
  ctm_sort_modal: false,
  ctm_filter_modal: false,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};

export const Context = createContext(initialState);
export default Store;
