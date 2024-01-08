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
  DollarSign
} from "react-feather";

export const navigationData = [
  {
    id: "home",
    title: "Home",
    icon: <Home size={24} />,
    href: "/home",
    roles: ["INTERN", "ADMIN"],
  },
  {
    id: "internshipAttendance",
    title: "Internship Logbook",
    icon: <List size={24} />,
    href: "/internship/logbook",
    roles: ["INTERN", "ADMIN"],
  }
];
