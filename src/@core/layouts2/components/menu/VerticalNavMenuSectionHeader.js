// ** Third Party Components
import { MoreHorizontal, Menu } from "react-feather";
import Image from "next/image";
import { useRouter } from "next/router";
// import HomeIcon from '@mui/icons-material/Home';


const VerticalNavMenuSectionHeader = ({ item }) => {
  const router = useRouter()
  let routerName = router.pathname.split("/")
  routerName = routerName[routerName.length -1].toUpperCase()
  const routerKecelakaanKerja = routerName === "ACCIDENT_REPORT" && "KECELAKAAN KERJA";

  return (
    // <li className="navigation-header d-flex sidebar-group-active menu-collapsed-open nav-item has-sub my-50">
    //   <span>{item.moduleName}</span>
    //   <Menu className={item.iconClass} />
    // </li>
    <li
        className={`rounded`}
      >
        <a
          className={`d-flex align-items-center`}
          onClick={() => {
            if (item.moduleUrl == "MasterArea") {
              item.moduleUrl = "/reports/hydrant"
            }
            router.push(item.moduleUrl)
          }}
          style={{
            backgroundColor: routerName == `${item.moduleName}` || (routerKecelakaanKerja === item.moduleName) ? "#ff795b" : "",
            borderRadius: 5,
            alignSelf: 'center',
          }}
        >
          {item.icon}
          <span className="menu-title text-truncate mr-1">{item.moduleName}</span>
        </a>
      </li>
  );
};

export default VerticalNavMenuSectionHeader;
