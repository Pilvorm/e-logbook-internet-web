import { API_MASTER } from "constant";
import { getHeaders } from "helpers/utils";
import { store } from "redux/store";

export const searchDepartment = (searchQuery) => {
  const header = getHeaders();

  return fetch(`${API_MASTER}/Department`, {
    headers: {
      ...header,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.filter((department) => {
        return department.departmentName.toLowerCase().includes(searchQuery.toLowerCase());
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAsyncOptionsDepartment = (inputText) => {
  return searchDepartment(inputText).then((resp) => {
    return resp.map((department) => ({
      ...department,
      value: department.departmentName,
      label: department.departmentName,
    }));
  });
};
