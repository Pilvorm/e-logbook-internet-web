import axios from "axios";
import { API_MASTER } from "constant";
import { getHeaders } from "helpers/utils";
import { store } from "redux/store";

export const getSchoolAsyncSelect = (name) => async (dispatch) => {
  const header = getHeaders(store.getState().authReducers.token);

  try {
    const response = await axios({
      url: `${API_MASTER}/School`,
      headers: header,
      method: "GET",
    });

    // Map the value inside the try block
    const updatedData = response.data.map((item) => ({
      ...item,
      label: item.schoolName,
      value: item.schoolName,
    }));

    return updatedData;

    // return response.data;
  } catch (error) {
    return error.response;
  }
};
