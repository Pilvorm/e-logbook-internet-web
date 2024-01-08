import {
  GET_LOGBOOK_DATA,
  CREATE_LOGBOOK_DATA,
  EDIT_LOGBOOK_DATA,
} from "redux/types";

const initialState = {
  data: [],
  currentPage: 0,
  totalPage: 0,
  pageSize: 0,
};

const logbookReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_LOGBOOK_DATA:
      return {
        ...state,
        data: payload.data,
        currentPage: payload.currentPage,
        totalPage: payload.totalPage,
        totalData: payload.totalData,
        pageSize: payload.pageSize,
      };
    case CREATE_LOGBOOK_DATA:
      return payload;
    case EDIT_LOGBOOK_DATA:
      return payload;
    default:
      return state;
  }
};

export default logbookReducers;
