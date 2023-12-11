// ** React Imports
import { Fragment } from "react";

// ** Next Imports
import Link from "next/link";

// ** Dropdowns Imports
import UserDropdown from "./UserDropdown";
import NotificationDropdown from "./NotificationDropdown";

// ** Third Party Components
import { Button, NavItem, NavLink } from "reactstrap";
import { Menu, Settings } from "react-feather";
import { signIn, useSession } from "next-auth/react";

const NavbarComponent = (props) => {
  // ** Props
  const { setMenuVisibility, isSupplier } = props;
  const { data: session, status } = useSession();

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const handleNavLinkClick = (event) => {
    event.preventDefault();
    console.log("Clicked NavLink");
    setMenuVisibility(true);
    // Add your desired action here
  };

  return (
    <Fragment>
      <ul className={`nav navbar-nav align-items-center ${isMobile ? "d-flex justify-content-between w-100" : "ml-auto"}`}>
        {/* <SettingsItem href="/" /> */}
        {isMobile && (
          <NavItem className="mobile-menu mr-auto"
          onClick={() => setMenuVisibility(true)}
          >
            <NavLink
              className="nav-menu-main menu-toggle hidden-xs is-active"
            >
              <Menu className="ficon" />
            </NavLink>
          </NavItem>
        )}
        {!session?.user && (
          <Button className="ml-1" onClick={signIn}>
            Login
          </Button>
        )}

        {session?.user && (
          <>
            <UserDropdown newUser={props.newUser} />
          </>
        )}
      </ul>
    </Fragment>
  );
};
export default NavbarComponent;
