import axios from "axios";
import { API_MASTER, API_LOGBOOK } from "constant";
import { getHeaders } from "helpers/utils";
import { store } from "redux/store";
import {
  GET_LOGBOOK_DATA,
  CREATE_LOGBOOK_DATA,
  EDIT_LOGBOOK_DATA,
} from "redux/types";

export const getLogbookData = (param) => async (dispatch) => {
  const header = getHeaders(store.getState().authReducers.token);

  try {
    const response = await axios({
      url: API_LOGBOOK + "/InternshipLogbookLogbook/GetLogbookData",
      method: "GET",
      headers: { ...header, ...param },
    });

    dispatch({ type: GET_LOGBOOK_DATA, payload: response.data });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const createLogbookData = (data) => async (dispatch) => {
  const header = getHeaders(store.getState().authReducers.token);

  try {
    const response = await axios({
      url: API_LOGBOOK + "/InternshipLogbookLogbook/SaveLogbook",
      method: "POST",
      headers: header,
      data,
    });

    dispatch({ type: CREATE_LOGBOOK_DATA, payload: response.data });
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
    dispatch({ type: EDIT_LOGBOOK_DATA, payload: response.data });

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
