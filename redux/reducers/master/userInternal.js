import {
  CREATE_MASTER_USER_INTERNAL,
  DELETE_MASTER_USER_INTERNAL,
  EDIT_MASTER_USER_INTERNAL,
  GET_ALL_MASTER_USER_INTERNAL,
  GET_ALL_ROLES,
} from "redux/types";

const initialState = {
  data: [],
  currentPage: 0,
  totalPage: 0,
  pageSize: 0,
};

const masterUserInternalReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_MASTER_USER_INTERNAL:
      return {
        ...state,
        data: payload.data,
        currentPage: payload.currentPage,
        totalPage: payload.totalPage,
        totalData: payload.totalData,
        pageSize: payload.pageSize,
      };
    case DELETE_MASTER_USER_INTERNAL:
      return payload;
    case CREATE_MASTER_USER_INTERNAL:
      return payload;
    case EDIT_MASTER_USER_INTERNAL:
      return payload;
    default:
      return state;
  }
};

export default masterUserInternalReducers;
