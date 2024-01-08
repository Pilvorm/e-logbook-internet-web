import axios from "axios";
import { API_MASTER, AUTH_URL, USER_ROLE_URL, AUTHORIZATION_URL, MODULE_URL } from "constant";
import { getHeaders } from "helpers/utils";

const headerAuthentication = new Headers();
headerAuthentication.append("Accept", "*/*");
headerAuthentication.append("Content-Type", "application/json");

export const submitLogin = (data) => {
  return fetch(`${API_AUTH}/api/User/authenticate`, {
    method: "POST",
    headers: headerAuthentication,
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
};

export const onLogin = async (data) => {
  try {
    const response = await axios({
      // url: `${AUTH_URL}/api/UserAuthentication/authenticate/nonGuest`,
      url: `${API_MASTER}/UserAuth/AuthenticateInternal`,
      method: "POST",
      headers: getHeaders(),
      data,
    });
    return response.data;
  } catch (error) {
    return { status: error.response.status, statusText: error.response.data };
  };
};

export const getRoleUser = async (upn) => {
  console.log(`${API_MASTER}/Role/GetRoleByUpn?Upn=${upn}`);
  try {
    const response = await axios({
      url: `${API_MASTER}/Role/GetRoleByUpn?Upn=${upn}`,
      method: "GET",
      headers: getHeaders(),
    });
    return response;
  } catch (error) {
    return { status: error.response.status, statusText: error.response.data };
  };
};

export const getModule = async () => {
  try {
    const response = await axios({
      url: `${MODULE_URL}/api/Module/Web/portalga/NestedMenu`,
      method: "GET",
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return { status: error.response.status, statusText: error.response.data };
  };
};

export const getModuleMobile = async () => {
  try {
    const response = await axios({
      url: `${MODULE_URL}/api/Module/Mobile/portalga`,
      method: "GET",
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return { status: error.response.status, statusText: error.response.data };
  };
};
