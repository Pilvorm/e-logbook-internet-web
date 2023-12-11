import {
  Circle,
  Grid,
  Home,
  Users,
  File,
  Map,
  MapPin,
  User,
  Box,
  List,
  HelpCircle,
  Paperclip,
} from "react-feather";

let superRole = ["HRD-Admin", "IT-ADMIN", "HRD-Recruiter", "HRD-SuperAdmin"];

export const navigationData = [
  {
    id: "home",
    title: "Home",
    icon: <Home size={24} />,
    href: "/home",
    roles: superRole,
  },
  {
    id: "home",
    title: "My Task",
    icon: <List size={24} />,
    href: "/myTask",
    roles: superRole,
  },
  // {
  //   id: "hsse",
  //   title: "HSSE Online",
  //   icon: <List size={24} />,
  //   roles: superRole,
  //   children:
  // },

  {
    id: "master",
    title: "Master",
    icon: <Grid size={24} />,
    roles: ["HRD-Admin", "IT-ADMIN", "HRD-Recruiter", "HRD-SuperAdmin"],
    children: [
      {
        id: "Area",
        title: "Master Area",
        icon: <Users size={24} />,
        href: "/hsse/master/area",
        roles: ["HRD-Admin", "HRD-SuperAdmin"],
      },
      {
        id: "Lokasi",
        title: "Master Lokasi",
        icon: <Users size={24} />,
        href: "/hsse/master/lokasi",
        roles: ["HRD-Admin", "HRD-SuperAdmin"],
      },
      {
        id: "Role",
        title: "Master Role",
        icon: <Users size={24} />,
        href: "/hsse/master/user",
        roles: ["HRD-Admin", "HRD-SuperAdmin"],
      },
    ],
  },
  {
    id: "inventory",
    title: "Inventory",
    icon: <List size={24} />,
    roles: superRole,
    href: "/hsse/inventory",
  },
  {
    id: "nearmiss",
    title: "Nearmiss",
    icon: <List size={24} />,
    roles: superRole,
    href: "/hsse/nearmiss",
  },
  // {
  //   id: "candidateList",
  //   title: "Candidate List",
  //   icon: <List size={24} />,
  //   href: "/candidateList",
  //   roles: ["HRD-Admin", "IT-ADMIN", "HRD-Recruiter", "HRD-SuperAdmin"],
  //   children: [
  //     {
  //       id: "test123",
  //       title: "Candidate List",
  //       icon: <List size={24} />,
  //       href: "/candidateList",
  //       roles: ["HRD-Admin", "IT-ADMIN", "HRD-Recruiter", "HRD-SuperAdmin"],
  //       children: [
  //         {
  //           id: "candidateList",
  //           title: "Candidate List",
  //           icon: <List size={24} />,
  //           href: "/candidateList",
  //           roles: ["HRD-Admin", "IT-ADMIN", "HRD-Recruiter", "HRD-SuperAdmin"],
  //         },
  //       ]
  //     },
  //   ]
  // },
];
