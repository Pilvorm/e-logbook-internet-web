// ** React Imports
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import iconLogo from "/public/images/logo/logo-kalbe-icon.webp";
import iconTypo from "/public/images/logo/logo-kalbe-typography.webp";

const VerticalMenuHeader = (props) => {
  // ** Props
  const {
    menuCollapsed,
    setMenuCollapsed,
    menuVisibility,
    setMenuVisibility,
    setGroupOpen,
  } = props;

  // ** Reset open group
  useEffect(() => {
    if (!menuVisibility && menuCollapsed) setGroupOpen([]);
  }, [menuVisibility, menuCollapsed]);

  const sizingRatio = 0.1;

  return (
    <div className="navbar-header mb-3">
      <ul className="nav navbar-nav flex-row">
        <li className="nav-item mr-auto">
          {/* <Link href="/"> */}
          <a className="navbar-brand active">
            <span className="brand-logo">
              <Image
                src={iconLogo}
                width={250 * sizingRatio}
                height={541 * sizingRatio}
                alt="logo"
              />
            </span>
            <h2 className="brand-text text-black text-bold mb-0 pl-0">
              <Image
                src={iconTypo}
                width={950 * sizingRatio}
                height={541 * sizingRatio}
                alt="logo"
                placeholder="blur"
              />
            </h2>
          </a>
          {/* </Link> */}
        </li>
        <li className="nav-item nav-toggle">
          <div className="nav-link modern-nav-toggle cursor-pointer"></div>
        </li>
      </ul>
    </div>
  );
};

export default VerticalMenuHeader;
