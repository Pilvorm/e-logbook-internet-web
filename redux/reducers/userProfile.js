import { GET_ALL_USER_PROFILE } from "redux/types";

const initialState = {
  data: [],
  currentPage: 0,
  totalPage: 0,
  pageSize: 0,
};

export default function userProfileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USER_PROFILE:
      return {
        ...state,
        data: action.payload.data.items,
        currentPage: action.payload.data.page,
        totalPage: action.payload.data.totalPage,
        pageSize: action.payload.data.pageSize,
        totalData: action.payload.data.totalItem,
      };

    default:
      return state;
  }
}
