import {
    CREATE_MASTER_INTERN,
    DELETE_MASTER_INTERN,
    EDIT_MASTER_INTERN,
    GET_ALL_MASTER_INTERN,
    GET_ALL_ROLES,
  } from "redux/types";
  
  const initialState = {
    data: [],
    currentPage: 0,
    totalPage: 0,
    pageSize: 0,
  };
  
  const masterInternReducers = (state = initialState, { type, payload }) => {
    switch (type) {
      case GET_ALL_MASTER_INTERN:
        return {
          ...state,
          data: payload.data,
          currentPage: payload.currentPage,
          totalPage: payload.totalPage,
          totalData: payload.totalData,
          pageSize: payload.pageSize,
        };
      case DELETE_MASTER_INTERN:
        return payload;
      case CREATE_MASTER_INTERN:
        return payload;
      case EDIT_MASTER_INTERN:
        return payload;
      default:
        return state;
    }
  };
  
  export default masterInternReducers;
  