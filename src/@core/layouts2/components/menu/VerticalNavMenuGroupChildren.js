import { useRouter } from "next/router";
import { Collapse } from "reactstrap";
import VerticalNavMenuLink from "./VerticalNavMenuLink";
import { getPermissionComponent } from "helpers/getPermission";

const VerticalNavMenuGroupChildren = (props) => {
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
    if (groupActive && groupActive.includes(item.moduleCode)) {
      toggleActiveGroup(item.moduleCode);
    } else {
      toggleOpenGroup(item.moduleCode, parentItem);
    }

    e.preventDefault();
  };

  return (
    // getPermissionComponent(item.roles || []) && (
      <li
        className={`nav-item has-sub my-50 bg-transparent ${
          router.pathname.startsWith(item.href)
            ? menuHover
              ? `sidebar-group-active menu-collapsed-open ${
                  groupOpen.includes(item.moduleCode) ? "open" : "active"
                }`
              : "active"
            : groupOpen.includes(item.moduleCode)
            ? "open"
            : "not-open"
        }`}
      >
        <a
          className={`d-flex align-items-center my-50 ${
            groupOpen.includes(item.moduleCode) || groupActive.includes(item.moduleCode)
              ? "bg-secondary bg-lighten-2 text-white"
              : ""
          }`}
          onClick={(e) => onCollapseClick(e, item)}
        >
          {item.icon}
          <span className="menu-title text-truncate mr-2">{item.moduleName}</span>
        </a>
        <ul className="menu-content">
          <Collapse
            isOpen={
              (groupActive && groupActive.includes(item.moduleCode)) ||
              (groupOpen && groupOpen.includes(item.moduleCode))
            }
          >
            {item.thirdLevelMenu &&
              item.thirdLevelMenu.map((childItem) => {
                return (
                  <VerticalNavMenuLink
                    key={childItem.moduleCode}
                    childChildItem
                    item={childItem}
                  />
                );
              })}
          </Collapse>
        </ul>
      </li>
    // )
  );
};

export default VerticalNavMenuGroupChildren;
