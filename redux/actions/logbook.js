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
      url: API_LOGBOOK + "/GetLogbookData",
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
      url: API_LOGBOOK + "/SaveLogbook",
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

export const submitLogbook =
  (role, upn, name, email, education, data) => async (dispatch) => {
    const header = getHeaders(store.getState().authReducers.token);
    const cstmHeaders = {
      "CSTM-ROLE": role,
      "CSTM-UPN": upn,
      "CSTM-NAME": name,
      "CSTM-EMAIL": email,
      "CSTM-EDUCATION": education
    };

    try {
      const response = await axios({
        url: `${API_LOGBOOK}/Submit/`,
        method: "POST",
        headers: {
          ...header,
          ...cstmHeaders,
        },
        data
      });

      return response;
    } catch (error) {
      console.log(error.response);
      console.error(error.response);
      return error;
    }
  };