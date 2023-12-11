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

  const SettingsItem = ({ href }) => (
    <NavItem tag="li" className="nav-link nav-item mr-25">
      <NavLink tag={Link} href={href} className="nav-link">
        <a>
          <Settings className="ficon" />
        </a>
      </NavLink>
    </NavItem>
  );

  return (
    <Fragment>
      {isSupplier ? (
        <div className="w-100">
          <h6 className="m-0 text-right"></h6>
        </div>
      ) : (
        <>
          <div className="bookmark-wrapper d-flex align-items-center">
            <ul className="nav navbar-nav d-xl-none">
              <NavItem className="mobile-menu mr-auto">
                <NavLink
                  className="nav-menu-main menu-toggle hidden-xs is-active"
                  onClick={() => setMenuVisibility(true)}
                >
                  <Menu className="ficon" />
                </NavLink>
              </NavItem>
            </ul>
          </div>
          <ul className="nav navbar-nav align-items-center ml-auto">
            {/* <SettingsItem href="/" /> */}
            {!session?.user && (
              <Button className="ml-1" onClick={signIn}>
                Login
              </Button>
            )}
            {session?.user && (
              <>
                {/* <NotificationDropdown /> */}
                <UserDropdown newUser={props.newUser} />
              </>
            )}
          </ul>
        </>
      )}
    </Fragment>
  );
};
export default NavbarComponent;
