import axios from "axios";
import { API_MASTER } from "constant";
import { getHeaders } from "helpers/utils";
import { store } from "redux/store";

export const getFacultyAsyncSelect = (name) => async (dispatch) => {
  const header = getHeaders(store.getState().authReducers.token);

  try {
    const response = await axios({
      url: `${API_MASTER}/Faculty`,
      headers: header,
      method: "GET",
    });

    // Map the value inside the try block
    const updatedData = response.data.map((item) => ({
      ...item,
      label: item.facultyName,
      value: item.facultyName,
    }));

    return updatedData;

    // return response.data;
  } catch (error) {
    return error.response;
  }
};
