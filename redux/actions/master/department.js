import axios from "axios";
import { API_MASTER } from "constant";
import { getHeaders } from "helpers/utils";
import { store } from "redux/store";

export const getDepartmentAsyncSelect = (name) => async (dispatch) => {
  const header = getHeaders(store.getState().authReducers.token);

  try {
    const response = await axios({
      url: `${API_MASTER}/Department`,
      headers: header,
      method: "GET",
    });

    // Map the value inside the try block
    const updatedData = response.data.map((item) => ({
      ...item,
      label: item.departmentName,
      value: item.departmentName,
    }));

    return updatedData;

    // return response.data;
  } catch (error) {
    return error.response;
  }
};
