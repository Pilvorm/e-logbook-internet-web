import axios from "axios";
import { AUTH_URL, USER_ROLE_URL, AUTHORIZATION_URL, MODULE_URL } from "constant";
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
      url: `${AUTH_URL}/api/UserAuthentication/authenticate/nonGuest`,
      method: "POST",
      headers: getHeaders(),
      data,
    });
    return response.data;
  } catch (error) {
    return { status: error.response.status, statusText: error.response.data };
  };
};

export const onLoginGuest = async (data) => {
  try {
    const response = await axios({
      url: `${AUTH_URL}/api/HsseOnlineAuthentication/loginGuest`,
      method: "POST",
      headers: getHeaders(),
      data,
    });
    return response.data;
  } catch (error) {
    return { status: error.response.status, statusText: error.response.data.errors };
  };
};

export const onSubmitSecurityCode = async (code) => {
  try {
    const response = await axios({
      url: `${AUTH_URL}/api/HsseOnlineAuthentication/authenticate/${code}/securityCode`,
      method: "POST",
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return { status: error.response.status, statusText: error.response.data };
  };
};

export const getRoleUser = async (email) => {
  console.log(`${USER_ROLE_URL}/api/UserRoles/GetRolesByUPN?UPN=${email}&ApplicationCode=hsseonline`);
  try {
    const response = await axios({
      url: `${USER_ROLE_URL}/api/UserRoles/GetRolesByUPN?UPN=${email}&ApplicationCode=hsseonline`,
      method: "GET",
      headers: getHeaders(),
    });
    return response.data;
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

export const getAuthUser = async (roleCode) => {
  try {
    const response = await axios({
      url: `${AUTHORIZATION_URL}/api/Authorization/GetModuleAccess?roleCode=${roleCode}&appCode=hsseonline`,
      method: "GET",
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return { status: error.response.status, statusText: error.response.data };
  };
};
