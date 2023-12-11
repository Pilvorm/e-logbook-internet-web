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
  AlertTriangle,
  Compass,
  PlusSquare,
  FileText,
} from "react-feather";

export const navigationData = [
  {
    id: "home",
    title: "Home",
    icon: <Home size={24} />,
    href: "/home",
    roles: ["HSSE-SU", "HSSE-SYSADMIN", "HSSE-INSP", "HSSE-INSP-SUP", "HSSE-MAN", "HSSE-PIC-CAPA", "HSSE-USR"],
  },
  {
    id: "internshipAttendance",
    title: "Internship Attendance",
    icon: <List size={24} />,
    href: "/internship",
    roles: ["HSSE-SYSADMIN", "HSSE-SYSADMIN", "HSSE-INSP", "HSSE-INSP-SUP"],
  },
  {
    id: "master",
    title: "Master",
    icon: <Grid size={24} />,
    roles: ["HSSE-SU", "HSSE-SYSADMIN", "HSSE-INSP", "HSSE-INSP-SUP", "HSSE-MAN", "HSSE-PIC-CAPA", "HSSE-USR"],
    children: [
      {
        id: "intern",
        title: "Master Intern",
        icon: <Users size={24} />,
        roles: ["HSSE-SYSADMIN", "HSSE-INSP", "HSSE-INSP-SUP", "HSSE-SU"],
        href: "/master/intern",
      },
      {
        id: "user",
        title: "Master User",
        icon: <Users size={24} />,
        roles: ["HSSE-SU", "HSSE-SYSADMIN", "HSSE-INSP", "HSSE-INSP-SUP", "HSSE-MAN", "HSSE-PIC-CAPA", "HSSE-USR"],
        href: "/master/user",
      }
    ],
  },
];
