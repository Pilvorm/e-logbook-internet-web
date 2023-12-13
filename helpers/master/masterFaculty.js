import { API_MASTER } from "constant";
import { getHeaders } from "helpers/utils";
import { store } from "redux/store";

export const getFaculty = (searchQuery) => {
  const header = getHeaders();

  return fetch(`${API_MASTER}/Faculty`, {
    headers: {
      ...header,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const searchRole = (searchQuery) => {
  const header = getHeaders();

  return fetch(`${API_ROLES}/GetBySearchKey`, {
    headers: {
      ...header,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAsyncOptionsUser = (inputText) => {
  return searchUser(inputText).then((resp) => {
    return resp.data.items.map((singleData) => ({
      ...singleData,
      value: singleData.nik,
      label: singleData.name,
    }));
  });
};
