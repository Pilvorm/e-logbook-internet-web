// HTTP CODE
export const HTTP_CODE = {
  OK: 200,
  CREATED: 201,
  DELETED: 204,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
  CONFLICT: 409,
};

export const EDUCATION_DATA = [
  {
    id: 1,
    value: "S1",
    name: "S1",
    label: "S1",
  },
  {
    id: 2,
    value: "D3",
    name: "D3",
    label: "D3",
  },
  {
    id: 3,
    value: "SMA",
    name: "SMA",
    label: "SMA",
  },
];

export const COMPANY_DATA = [
  {
    id: 1,
    value: "01",
    name: "PT XYZ Tbk.",
    label: "PT XYZ Tbk.",
    companyCode: "01",
    companyName: "PT XYZ Tbk.",
  },
];

export const DEPARTMENT_DATA = [
  {
    id: 1,
    value: "Corporate IT",
    name: "Corporate IT",
    label: "Corporate IT",
  },
  {
    id: 2,
    value: "Corporate Digital",
    name: "Corporate Digital",
    label: "Corporate Digital",
  },
  {
    id: 3,
    value: "Corporate Analyst",
    name: "Corporate Analys",
    label: "Corporate Analys",
  },
];

export const ROLE_DATA = [
  {
    roleCode: "ELB-MENTOR",
    roleName: "MENTOR",
  },
  {
    roleCode: "ELB-HR",
    roleName: "HUMAN RESOURCES",
  },
  {
    roleCode: "ELB-SYSADMIN",
    roleName: "SYSTEM ADMIN",
  },
];

export const MONTH_OPTIONS = [
  {
    id: 1,
    value: 1,
    name: "1",
    label: "1",
  },
  {
    id: 2,
    value: 2,
    name: "2",
    label: "2",
  },
  {
    id: 3,
    value: 3,
    name: "3",
    label: "3",
  },
  {
    id: 4,
    value: 4,
    name: "4",
    label: "4",
  },
  {
    id: 5,
    value: 5,
    name: "5",
    label: "5",
  },
  {
    id: 6,
    value: 6,
    name: "6",
    label: "6",
  },
  {
    id: 7,
    value: 7,
    name: "7",
    label: "7",
  },
  {
    id: 8,
    value: 8,
    name: "8",
    label: "8",
  },
  {
    id: 9,
    value: 9,
    name: "9",
    label: "9",
  },
  {
    id: 10,
    value: 10,
    name: "10",
    label: "10",
  },
  {
    id: 11,
    value: 11,
    name: "11",
    label: "11",
  },
  {
    id: 12,
    value: 12,
    name: "12",
    label: "12",
  },
];

export const AUTH_URL =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_API_SERVICE_NAME_AUTH_URL
    : process.env.NEXT_PUBLIC_API_AUTH_URL;

export const AUTHORIZATION_URL =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_API_AUTHORIZATION
    : process.env.NEXT_PUBLIC_API_AUTHORIZATION;


export const API_MASTER =
  "https://goshawk-trusty-vertically.ngrok-free.app/api";

export const API_LOGBOOK =
  "https://1bda-101-128-112-71.ngrok-free.app/api/InternshipLogbookLogbook";

export const API_USER_PROFILE =
  "http://kf-asd-userprofile-development-kf-asd-apiglobal-dev.apps.alpha.kalbe.co.id/api/UserProfile";

