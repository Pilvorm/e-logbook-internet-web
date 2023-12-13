import { API_MASTER } from "constant";
import { getHeaders } from "helpers/utils";
import { store } from "redux/store";

export const searchSchool = (searchQuery) => {
  const header = getHeaders();

  return fetch(`${API_MASTER}/School`, {
    headers: {
      ...header,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.filter((school) => {
        return school.schoolName.toLowerCase().includes(searchQuery.toLowerCase());
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAsyncOptionsSchool = (inputText) => {
  return searchSchool(inputText).then((resp) => {
    return resp.map((school) => ({
      ...school,
      value: school.schoolName,
      label: school.schoolName,
    }));
  });
};
