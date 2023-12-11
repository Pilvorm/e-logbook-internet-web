export const postCover = (values) => {
  const formData = new FormData();
  formData.append("formFile", values);
  // formData.append("file", values);

  return fetch(API_URL + API_POSTFILE, {
    // return fetch("http://10.161.67.81:8157/api/Files/upload/single", {
    method: "POST",
    headers: headerPostFile,
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      // setWrongUser(true);
    });
};
