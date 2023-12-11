import axios from "axios";
import { API_GLOBAL_COMPANY_URL, API_GLOBAL_SBU_URL } from "constant";
import { getHeaders } from "helpers/utils";
import { store } from "redux/store";

export const searchSbu = (searchQuery) => {
  const header = getHeaders(store.getState().authReducers.token);

  return fetch(API_GLOBAL_SBU_URL + "/api/BU/BuAndOrgGroupPharma", {
    headers: {
      ...header,
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      return data.filter((sbu) => {
        return sbu.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};

export const searchCompany = async (searchQuery) => {
  const header = getHeaders(store.getState().authReducers.token);

  try {
    const response = await axios.get(
      `${API_GLOBAL_COMPANY_URL}/api/Company?Search=${searchQuery}`,
      {
        headers: {
          ...header,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const getAsyncOptionsSBU = (inputText) => {
  return searchSbu(inputText).then((resp) => {
    return resp.map((sbu) => ({
      ...sbu,
      value: sbu.name,
      label: sbu.name,
    }));
  });
};
