// export const getPermissionComponent = (permittedRole) => {
//   const userRole = [];

//   if (typeof window !== "undefined") {
//     const data = JSON.parse(localStorage.getItem("userRoles")) || [];
//     userRole = data.map((data) => data.roleName) || [];
//   }

//   const similarRoles =
//     userRole.filter((userRole) => permittedRole.includes(userRole)) || [];

//   return similarRoles.length !== 0;
// };

export const getPermissionComponent = (permittedRole) => {
  const userRole = [];

  if (typeof window !== "undefined") {
    try {
      const dataNew = localStorage.getItem("userRoles") || [];
      userRole = dataNew || [];
    } catch (error) {
      console.error("Error retrieving user role:", error);
      userRole = [];
    }
  }

  const similarRoles =
    Array.isArray(permittedRole) && permittedRole.includes(userRole);

  console.log(permittedRole, "PERMITTED");
  console.log(userRole);
  console.log(similarRoles);

  return similarRoles ? similarRoles.length !== 0 : false;
};

// export const getPermissionComponentByRoles = (permittedRole) => {
//   let userRole = [];

//   if (typeof window !== "undefined") {
//     const data = JSON.parse(localStorage.getItem("userRoles")) || [];
//     userRole = data;
//   }

//   const similarRoles =
//     userRole.filter((userRole) => permittedRole.includes(userRole)) || [];

//   return similarRoles.length !== 0;
// };
