import axios from "axios";
import { API_GLOBAL_INSPECTION } from "constant";
import { getHeaders } from "helpers/utils";

export const getAllInspection = async (token, param) => {
  try {
    const response = await axios({
      url: `${API_GLOBAL_INSPECTION}/api/HsseOnlineInspeksi`,
      method: "GET",
      headers: {
        ...getHeaders(token),
        ...param,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInspectionById = async (token, id) => {
  try {
    const response = await axios({
      url: `${API_GLOBAL_INSPECTION}/api/HsseOnlineInspeksi/${id}`,
      method: "GET",
      headers: getHeaders(token),
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
