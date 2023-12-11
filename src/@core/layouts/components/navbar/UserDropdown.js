// ** Next Imports
import Link from "next/link";

// ** Custom Components
import Avatar from "src/@core/components/avatar";

// ** Third Party Components
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather";
import { signOut, useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  errorAlertNotification,
  errorSignOutNotification,
} from "components/notification";

const UserDropdown = ({ newUser }) => {
  const { data: session, status } = useSession();
  // const session = [{user;}];
  const [popUp, setPopUp] = useState(false);
  const togglePopup = () => setPopUp(!popUp);

  const router = useRouter();

  const logoutFunc = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    signOut({
      callbackUrl: "/home",
    });
  };

  const site = session?.user.userSite ? JSON.parse(session?.user.userSite) : "";
  const defaultRole =
    localStorage.getItem("currentUserRole") !== null
      ? localStorage.getItem("currentUserRole")
      : "";
  const defaultSite =
    localStorage.getItem("currentUserSite") !== null
      ? localStorage.getItem("currentUserSite")
      : "";

  let getCompName = null;

  try {
    if (
      defaultSite !== null &&
      defaultSite !== "undefined" &&
      defaultSite !== ""
    ) {
      getCompName = JSON.parse(defaultSite);
    }
    // if (getCompName === null) {
    //   errorSignOutNotification(
    //     "Error",
    //     "Company null, please contact admin to add company to this user."
    //   );

    //   return null;
    // }
  } catch (error) {
    console.error("Error: Unable to parse default site.", error);
  }

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name font-weight-bold">
            {session?.user.Name
              ? session.user.Name
              : session.user.name
              ? session.user.name
              : ""}
          </span>
          <span className="user-status">
            {session?.user.CompName}
            {/* {session?.user.iss} */}
          </span>
        </div>
        <Avatar
          img="/images/portrait/small/avatar-s-placeholder.png"
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu right>
        {!newUser && (
          <>
            <DropdownItem className="dropdown-item w-100" onClick={togglePopup}>
              <Settings size={14} className="mr-75" />
              <span className="align-middle">Change Site</span>
            </DropdownItem>
            <DropdownItem className="dropdown-item w-100" onClick={logoutFunc}>
              <Power size={14} className="mr-75" />
              <span className="align-middle">Logout</span>
            </DropdownItem>
          </>
        )}
        {newUser && (
          <DropdownItem className="dropdown-item w-100" onClick={signIn}>
            <Power size={14} className="mr-75" />
            <span className="align-middle">Login</span>
          </DropdownItem>
        )}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
