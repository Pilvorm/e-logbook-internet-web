import axios from "axios";
import { API_MASTER, API_MASTER_USER, API_ROLES } from "constant";
import { getHeaders } from "helpers/utils";
import { store } from "redux/store";
import { GET_ALL_ROLES, RE_GET_ROLES } from "redux/types";

export const getAllRoles = () => async (dispatch) => {
  try {
    const header = getHeaders(store.getState().authReducers.token);

    const response = await axios({
      url: API_MASTER + "/Role",
      method: "GET",
      headers: {
        ...header,
        "X-ORDERBY": "id",
      },
    });

    dispatch({ type: GET_ALL_ROLES, payload: response.data });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const reGetRoles = (data) => (dispatch) => {
  dispatch({ type: RE_GET_ROLES, payload: data });
};