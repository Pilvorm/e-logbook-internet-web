import axios from "axios";
import { API_MASTER, API_URL, API_USER_URL, USER_ROLE_URL } from "constant";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import UnauthorizedAccess from "pages/UnauthorizedAccess";
import React, { useEffect, useState } from "react";
import { getHeaders } from "./utils";
import _ from "lodash";
import Cookies from "js-cookie";

const fetchUserRolesFunction = async (dataSession) => {
  let fetchUserRoles;
  // const [flagCount, setFlagCount] = useState(0);
  let flagCount = 0;

  if (flagCount <= 1) {
    try {
      fetchUserRoles = await axios({
        // url: `${USER_ROLE_URL}/api/UserRoles/GetUserMultipleRolesByUPNAppCode?UPN=${sessionData.user.UserPrincipalName}&ApplicationCode=HSSEONLINE&CompanyCode=`,
        url: `${API_MASTER}/Role/GetRoleByUpn?Upn=${sessionData.user.UserPrincipalName}`,
        method: "get",
        headers: getHeaders(sessionData.user.token),
      });
      flagCount++;

      localStorage.setItem(
        "userRoles",
        JSON.stringify(fetchUserRoles.data.userRoles)
      );
    } catch (error) {
      // alert("Something went wrong");
    }
  }
};

export const Auth = ({ children, permittedRole }) => {
  const { data: session, status } = useSession();

  const userRole = [];
  const router = useRouter();

  // if (typeof window !== "undefined") {
  //   const data = JSON.parse(localStorage.getItem("currentUserRole"));
  //   // console.log(data, "DATAA");
  //   if (
  //     (!data && status === "authenticated") ||
  //     (_.isEmpty(data) && status === "authenticated")
  //   ) {
  //     router.push("/SelectRolePage");
  //   }

  //   // data ? (userRole = data.map((data) => data.roleName)) : [];
  // }

  if (status === "authenticated") {
    try {
      // debugger;
      const checkRole = JSON.parse(localStorage.getItem("currentUserRole"));
      let checkSiteStorage = JSON.parse(session?.user.userSite);

      // site.find((data) => data.IsDefault === true)
      let findDefaultSite = checkSiteStorage.find(
        (data) => data.IsDefault === true
      );

      if (!findDefaultSite) {
        // If no entry has IsDefault set to true, use the first entry as the default site
        findDefaultSite = checkSiteStorage[0];
      }

      // Now you can use the findDefaultSite as the default site

      if (!checkRole) {
        localStorage.setItem("flagRole", false);
        localStorage.setItem(
          "currentUserSite",
          JSON.stringify(findDefaultSite)
        );
        Cookies.set("currentUserSite", JSON.stringify(findDefaultSite));
      }
    } catch (error) {
      // console.log(error);
      // return false;
    }
  }

  if (permittedRole === null) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  if (status === "unauthenticated") {
    localStorage.clear();
  }

  // if (typeof window !== "undefined") {
  //   const data = JSON.parse(localStorage.getItem("userRoles"));
  //   if (
  //     (!data && status === "authenticated") ||
  //     (_.isEmpty(data) && status === "authenticated")
  //   ) {
  //     fetchUserRolesFunction(session);
  //   }

  //   data ? (userRole = data.map((data) => data.roleName)) : [];
  // }

  // const similarRoles =
  //   userRole.filter((userRole) => permittedRole.includes(userRole)) || [];

  if (typeof window !== "undefined") {
    // const currentUserRole = localStorage.getItem("userRoles");
    const currentUserRole = JSON.parse(localStorage.getItem("userRoles"));

    if (
      (!currentUserRole && status === "authenticated") ||
      (currentUserRole === "" && status === "authenticated")
    ) {
      fetchUserRolesFunction(session);
    }

    userRole = currentUserRole ? currentUserRole : [];
  }

  console.log(userRole, "ROLEE");
  console.log(permittedRole, "PERM");

  const similarRoles =
    userRole.filter((role) => permittedRole.includes(role)) || [];

  console.log(similarRoles, "SIM");

  if (similarRoles.length === 0 && status === "authenticated") {
    return <UnauthorizedAccess />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};
