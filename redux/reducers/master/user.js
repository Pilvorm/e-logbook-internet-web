import {
  CREATE_MASTER_USER,
  DELETE_MASTER_USER,
  EDIT_MASTER_USER,
  GET_ALL_MASTER_USER,
  GET_ALL_ROLES,
} from "redux/types";

const initialState = {
  data: [],
  currentPage: 0,
  totalPage: 0,
  pageSize: 0,
};

const masterUserReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_MASTER_USER:
      return {
        ...state,
        data: payload.data,
        currentPage: payload.currentPage,
        totalPage: payload.totalPage,
        totalData: payload.totalData,
        pageSize: payload.pageSize,
      };
    case DELETE_MASTER_USER:
      return payload;
    case CREATE_MASTER_USER:
      return payload;
    case EDIT_MASTER_USER:
      return payload;
    default:
      return state;
  }
};

export default masterUserReducers;
