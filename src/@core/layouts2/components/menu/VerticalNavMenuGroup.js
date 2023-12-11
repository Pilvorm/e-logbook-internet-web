import { getPermissionComponent } from "helpers/getPermission";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { Badge, Collapse } from "reactstrap";
import VerticalNavMenuGroupChildren from "./VerticalNavMenuGroupChildren";
import VerticalNavMenuLink from "./VerticalNavMenuLink";

const VerticalNavMenuGroup = (props) => {
  // ** Props
  const {
    item,
    groupActive,
    setGroupActive,
    groupOpen,
    setGroupOpen,
    parentItem,
    menuCollapsed,
    menuHover,
  } = props;

  const router = useRouter();

  // ** Children States
  const [childGroupActive, setChildGroupActive] = useState([]);
  const [childGroupOpen, setChildGroupOpen] = useState([]);

  // ** Toggles Open Group
  const toggleOpenGroup = (item) => {
    let openArr = groupOpen;
    let allParents;

    // ** If user clicked on menu group inside already opened group i.g. when user click on blog group inside pages group
    if (groupOpen && allParents && groupOpen[0] === allParents[0]) {
      groupOpen.includes(item)
        ? openArr.splice(openArr.indexOf(item), 1)
        : openArr.push(item);
    } else {
      openArr = [];
      if (!groupOpen.includes(item)) {
        openArr.push(item);
      }
    }

    // ** Set Open Group
    setGroupOpen([...openArr]);
  };

  // ** Toggle Active Group
  const toggleActiveGroup = (item) => {
    let activeArr = groupActive;

    activeArr.includes(item)
      ? activeArr.splice(activeArr.indexOf(item), 1)
      : activeArr.push(item);

    // ** Set open group removing any activegroup item present in opengroup state
    const openArr = groupOpen.filter((val) => !activeArr.includes(val));
    setGroupOpen([...openArr]);

    // **  Set Active Group
    setGroupActive([...activeArr]);
  };

  // ** On Group Item Click
  const onCollapseClick = (e, item) => {
    if (groupActive && groupActive.includes(item.id)) {
      toggleActiveGroup(item.id);
    } else {
      toggleOpenGroup(item.id, parentItem);
    }

    e.preventDefault();
  };

  // ** Returns condition to add open class
  const openClassCondition = (id) => {
    if ((menuCollapsed && menuHover) || menuCollapsed === false) {
      if (groupActive.includes(id) || groupOpen.includes(item.id)) {
        return true;
      }
    } else if (
      groupActive.includes(id) &&
      menuCollapsed &&
      menuHover === false
    ) {
      return false;
    } else {
      return null;
    }
  };

  // ** Get Children Roles
  const [permittedRoles, setPermittedRoles] = useState([]);
  let tempPermittedRoles = [];

  useEffect(() => {
    if (item.children) {
      item.children.map((children) => {
        if (children.roles) {
          children.roles.map((role) => {
            tempPermittedRoles.push(role);
          });
        }
      });

      setPermittedRoles([...new Set(tempPermittedRoles)]);
    }
  }, []);

  return (
    // getPermissionComponent(item.roles) && (
    <li
      // className={`nav-item has-sub ${
      //   openClassCondition(item.id) ? "open" : ""
      // } ${groupActive.includes(item.id) ? "menu-collapsed-open" : ""} ${
      //   groupActive.includes(item.id) || groupOpen.includes(item.id)
      //     ? "sidebar-group-active"
      //     : ""
      // }`}
      className={`nav-item has-sub my-50 ${
        router.pathname.startsWith(item.href)
          ? menuHover
            ? `sidebar-group-active menu-collapsed-open ${
                groupOpen.includes(item.id) ? "open" : "active"
              }`
            : "active"
          : groupOpen.includes(item.id)
          ? "open"
          : "not-open"
      }`}
    >
      <a
        className={`d-flex align-items-center`}
        onClick={(e) => onCollapseClick(e, item)}
      >
        {item.icon}
        <span className="menu-title text-truncate mr-2">{item.title}</span>
      </a>
      <ul className="menu-content">
        <Collapse
          isOpen={
            (groupActive && groupActive.includes(item.id)) ||
            (groupOpen && groupOpen.includes(item.id))
          }
        >
          {item.children &&
            item.children.map((childItem) => {
              if (childItem.children) {
                return (
                  <VerticalNavMenuGroupChildren
                    key={childItem.id}
                    item={childItem}
                    groupActive={childGroupActive}
                    setGroupActive={setChildGroupActive}
                    groupOpen={childGroupOpen}
                    setGroupOpen={setChildGroupOpen}
                    parentItem={item}
                    menuCollapsed={menuCollapsed}
                    menuHover={menuHover}
                    // {...props}
                  />
                );
              } else {
                return (
                  <VerticalNavMenuLink
                    key={childItem.id}
                    childItem
                    item={childItem}
                  />
                );
              }
            })}
        </Collapse>
      </ul>
    </li>
    // )
  );
};

export default VerticalNavMenuGroup;
