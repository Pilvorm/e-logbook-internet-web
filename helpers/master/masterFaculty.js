import { API_MASTER } from "constant";
import { getHeaders } from "helpers/utils";
import { store } from "redux/store";

export const searchFaculty = (searchQuery) => {
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
      return data.filter((faculty) => {
        return faculty.facultyName.toLowerCase().includes(searchQuery.toLowerCase());
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAsyncOptionsFaculty = (inputText) => {
  return searchFaculty(inputText).then((resp) => {
    return resp.map((faculty) => ({
      ...faculty,
      value: faculty.facultyName,
      label: faculty.facultyName,
    }));
  });
};
