// // ** React Imports
// import { useState, useRef, useEffect } from "react";
// import { ChevronsRight } from "react-feather";
// import { withResizeDetector } from "react-resize-detector";

// // ** Third Party Components
// import PerfectScrollbar from "react-perfect-scrollbar";

// // ** Vertical Menu Components
// import VerticalMenuHeader from "./VerticalMenuHeader";
// import VerticalNavMenuItems from "./VerticalNavMenuItems";

// const MenuComponent = (props) => {
//   // ** Props
//   const {
//     data,
//     menuCollapsed,
//     setMenuCollapsed,
//     menuVisibility,
//     setMenuVisibility,
//     width, // Width obtained from react-resize-detector
//   } = props;

//   // ** States
//   const [groupOpen, setGroupOpen] = useState([]);
//   const [groupActive, setGroupActive] = useState([]);
//   const [activeItem, setActiveItem] = useState(null);

//   // ** Menu Hover State
//   const [menuHover, setMenuHover] = useState(false);

//   // ** Ref
//   const shadowRef = useRef(null);

//   // ** Function to handle Mouse Enter
//   const onMouseEnter = () => {
//     setMenuHover(true);
//     setMenuVisibility(true);
//   };

//   // ** Function to handle Mouse Enter
//   const onMouseLeave = () => {
//     setMenuHover(false);
//     setMenuVisibility(false);
//   };

//   // ** Scroll Menu
//   const scrollMenu = (container) => {
//     if (shadowRef && container.scrollTop > 0) {
//       if (!shadowRef.current.classList.contains("d-block")) {
//         shadowRef.current.classList.add("d-block");
//       }
//     } else {
//       if (shadowRef.current.classList.contains("d-block")) {
//         shadowRef.current.classList.remove("d-block");
//       }
//     }
//   };

//   // ** Hide components if menuVisibility is false or on mobile devices
//   useEffect(() => {
//     if (!menuVisibility || width < 768) {
//       setMenuCollapsed(true);
//     } else {
//       setMenuCollapsed(false);
//     }
//   }, [menuVisibility, width]);

//   return (
//     <div
//       className={`main-menu menu-fixed menu-accordion menu-shadow ${
//         menuVisibility || menuCollapsed === false ? "expanded" : ""
//       } menu-light`}
//     >
//       <VerticalMenuHeader
//         setGroupOpen={setGroupOpen}
//         menuHover={menuHover}
//         {...props}
//       />
//       <div className="shadow-bottom" ref={shadowRef}></div>
//       {menuVisibility && ( // Render components only when menuVisibility is true
//         <PerfectScrollbar
//           className="main-menu-content h-auto"
//           options={{ wheelPropagation: false }}
//           onScrollY={(container) => scrollMenu(container)}
//         >
//           <ul className="navigation navigation-main">
//             <VerticalNavMenuItems
//               data={data}
//               groupActive={groupActive}
//               setGroupActive={setGroupActive}
//               activeItem={activeItem}
//               setActiveItem={setActiveItem}
//               groupOpen={groupOpen}
//               setGroupOpen={setGroupOpen}
//               menuCollapsed={menuCollapsed}
//               menuHover={menuHover}
//             />
//           </ul>
//         </PerfectScrollbar>
//       )}
//       {width >= 768 && ( // Only show the ChevronsRight component on non-mobile devices
//         <a
//           onClick={() => {
//             if (menuHover && menuVisibility) onMouseLeave();
//             else onMouseEnter();
//           }}
//         >
//           <ChevronsRight />
//         </a>
//       )}
//     </div>
//   );
// };

// export default withResizeDetector(MenuComponent);

// ** React Imports
// ** React Imports
import { useState, useRef, useEffect } from "react";
import { ChevronsRight } from "react-feather";

// ** Third Party Components
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Vertical Menu Components
import VerticalMenuHeader from "./VerticalMenuHeader";
import VerticalNavMenuItems from "./VerticalNavMenuItems";

const MenuComponent = (props) => {
  // ** Props
  const {
    data,
    menuCollapsed,
    setMenuCollapsed,
    menuVisibility,
    setMenuVisibility,
  } = props;

  // ** States
  const [groupOpen, setGroupOpen] = useState([]);
  const [groupActive, setGroupActive] = useState([]);
  const [activeItem, setActiveItem] = useState(null);

  // ** Menu Hover State
  const [menuHover, setMenuHover] = useState(false);

  // ** Ref
  const shadowRef = useRef(null);

  // ** Function to handle Mouse Enter
  const onMouseEnter = () => {
    setMenuHover(true);
    setMenuVisibility(true);
  };

  // ** Function to handle Mouse Enter
  const onMouseLeave = () => {
    setMenuHover(false);
    setMenuVisibility(false);
  };

  // ** Scroll Menu
  const scrollMenu = (container) => {
    if (shadowRef && container.scrollTop > 0) {
      if (!shadowRef.current.classList.contains("d-block")) {
        shadowRef.current.classList.add("d-block");
      }
    } else {
      if (shadowRef.current.classList.contains("d-block")) {
        shadowRef.current.classList.remove("d-block");
      }
    }
  };

  // ** Hide components if menuVisibility is false or on mobile devices
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (!menuVisibility || width < 768) {
        setMenuCollapsed(true);
      } else {
        setMenuCollapsed(false);
      }
    };

    // Check if window is available (client-side)
    if (typeof window !== "undefined") {
      handleResize(); // Initial check

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [menuVisibility]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      className={`main-menu menu-fixed menu-accordion menu-shadow ${
        menuVisibility || menuCollapsed === false ? "expanded" : ""
      } menu-light`}
      onMouseEnter={!isMobile ? onMouseEnter : undefined}
      onMouseLeave={!isMobile ? onMouseLeave : undefined}
    >
      <VerticalMenuHeader
        setGroupOpen={setGroupOpen}
        menuHover={menuHover}
        {...props}
      />
      <div className="shadow-bottom" ref={shadowRef}></div>
      {menuVisibility && (
        <PerfectScrollbar
          className="main-menu-content h-auto"
          options={{ wheelPropagation: false }}
          onScrollY={(container) => scrollMenu(container)}
        >
          <ul className="navigation navigation-main">
            <VerticalNavMenuItems
              data={data}
              groupActive={groupActive}
              setGroupActive={setGroupActive}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              groupOpen={groupOpen}
              setGroupOpen={setGroupOpen}
              menuCollapsed={menuCollapsed}
              menuHover={menuHover}
            />
          </ul>
        </PerfectScrollbar>
      )}
    </div>
  );
};

export default MenuComponent;
