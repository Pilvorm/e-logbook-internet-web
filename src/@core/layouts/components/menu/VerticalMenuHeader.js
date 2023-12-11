// ** React Imports
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import iconLogo from "/public/images/logo/logo-kalbe-icon.webp";
import iconTypo from "/public/images/logo/logo-kalbe-typography.webp";
import { X } from "react-feather";

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
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1200;

  return (
    <div className="navbar-header mb-3">
      <ul className="nav navbar-nav flex-row">
        <li className="nav-item w-100">
          {/* <Link href="/"> */}
          <a className="navbar-brand active w-100 d-flex">
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
            {menuVisibility && isMobile ? (
              <div className="ml-auto mt-1">
                <X onClick={() => setMenuVisibility((state) => !state)}/>
              </div>
            ) : null}
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
