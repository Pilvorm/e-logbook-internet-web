import axios from "axios";
import { API_USER_PROFILE } from "constant";
import { getHeaders } from "helpers/utils";
import { store } from "redux/store";
import { GET_ALL_USER_PROFILE } from "redux/types";

export const getAllUserProfile =
  ({ pageNumber = 1, pageSize = 10, searchQuery = "" }) =>
  async (dispatch) => {
    const header = getHeaders(store.getState().authReducers.token);

    try {
      const response = await axios.get(
        `${API_USER_PROFILE}/GetData/${pageNumber}/${pageSize}?searchValue=${searchQuery}`,
        {
          headers: { ...header },
        }
      );

      dispatch({
        type: GET_ALL_USER_PROFILE,
        payload: response.data,
      });
      return response;
    } catch (error) {
      return error;
    }
  };
