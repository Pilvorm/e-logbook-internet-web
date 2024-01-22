import axios from "axios";
import {
  API_MASTER,
} from "constant";
import { getHeaders } from "helpers/utils";
import { store } from "redux/store";
import {
  CREATE_MASTER_INTERN,
  DELETE_MASTER_INTERN,
  EDIT_MASTER_INTERN,
  GET_ALL_MASTER_INTERN,
  GET_MASTER_INTERN_BY_ID
} from "redux/types";

export const getAllMasterIntern = (param) => async (dispatch) => {
  const header = getHeaders(store.getState().authReducers.token);

  try {
    const response = await axios({
      url: API_MASTER + "/UserExternal",
      method: "GET",
      headers: { ...header, ...param },
    });

    dispatch({ type: GET_ALL_MASTER_INTERN, payload: response.data });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getMasterInternById = (id) => async (dispatch) => {
  const header = getHeaders(store.getState().authReducers.token);

  try {
    const response = await axios({
      url: API_MASTER + `/UserExternal/${id}`,
      method: "GET",
      headers: { ...header },
    });

    dispatch({ type: GET_MASTER_INTERN_BY_ID, payload: response.data });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const createMasterIntern = (data) => async (dispatch) => {
  const header = getHeaders(store.getState().authReducers.token);

  try {
    const response = await axios({
      url: API_MASTER + "/UserAuth/SignUp",
      method: "POST",
      headers: header,
      data,
    });

    dispatch({ type: CREATE_MASTER_INTERN, payload: response.data });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateMasterUserInternal = (id, data) => async (dispatch) => {
  const header = getHeaders(store.getState().authReducers.token);

  try {
    const response = await axios({
      url: API_MASTER + `/UserInternal/${id}`,
      method: "PUT",
      headers: { ...header },
      data,
    });
    dispatch({ type: EDIT_MASTER_USER_INTERNAL, payload: response.data });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteMasterIntern = (id) => async (dispatch) => {
  const header = getHeaders(store.getState().authReducers.token);

  try {
    const response = await axios({
      url: API_MASTER + `/UserExternal/${id}`,
      method: "DELETE",
      headers: header,
    });

    dispatch({ type: DELETE_MASTER_INTERN, payload: response.data });
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};
