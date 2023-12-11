import { GET_ALL_MASTER_ALLOWANCE, EDIT_MASTER_ALLOWANCE } from "redux/types";

const initialState = {
  data: [],
};

const masterAllowanceReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MASTER_ALLOWANCE:
      return {
        ...state,
        data: action.payload,
      };
    case EDIT_MASTER_ALLOWANCE:
      return action.payload;
    default:
      return state;
  }
};

export default masterAllowanceReducers;
