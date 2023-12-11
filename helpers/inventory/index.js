import axios from "axios";
import { INVENTORY_URL } from "constant";
import { getHeaders } from "helpers/utils";

const headerAuthentication = new Headers();
headerAuthentication.append("Accept", "*/*");
headerAuthentication.append("Content-Type", "application/json");

export const getAllInventory = async (token, param) => {
  try {
    const response = await axios({
      url: `${INVENTORY_URL}/Inventory`,
      method: "GET",
      headers: {
        ...getHeaders(token),
        ...param,
      },
    });
    return response;
  } catch (error) {
    return { status: error.response.status, statusText: error.response.data };
  }
};
export const getDetailInventory = async (token, param, id) => {
  try {
    const response = await axios({
      url: `${INVENTORY_URL}/Inventory/${id}`,
      method: "GET",
      headers: {
        ...getHeaders(token),
        ...param,
      },
    });
    return response.data;
  } catch (error) {
    return { status: error.response.status, statusText: error.response.data };
  }
};
