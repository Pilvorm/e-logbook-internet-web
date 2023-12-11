import BreadCrumbs from "components/custom/BreadcrumbCustom";
import { getPermissionComponent } from "helpers/getPermission";
import { useRouter } from "next/router";
import { Plus, Search } from "react-feather";
import {
  Button,
  CustomInput,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from "reactstrap";

const ListHeader = ({
  children,
  breadCrumbParent,
  breadCrumbParent2,
  breadCrumbActive,
  pageTitle,
  addButtonPermission,
  addPagePath,
  pageSize,
  searchQuery,
  tempSearchQuery,
  setTempSearchQuery,
  filterCard,
  pageSizeOptions,
  handlePageSize,
  handleSearchQuery,
  setSearchQuery,
  pageShowOptions,
  withSearch
}) => {
  const router = useRouter();

  return (
    <>
      <h2 className="m-0">{pageTitle}</h2>
      <BreadCrumbs {...{ breadCrumbParent, breadCrumbParent2, breadCrumbActive }} />
      <div className="d-flex justify-content-between align-items-center my-2">
        {children ||
          (addButtonPermission &&
            addPagePath &&
            getPermissionComponent(addButtonPermission) && (
              <Button.Ripple
                color="primary"
                className="btn-next"
                onClick={() => router.push(addPagePath)}
              >
                <Plus size={18} />
                <span className="align-middle ml-1 d-sm-inline-block d-none">
                  Add New
                </span>
              </Button.Ripple>
            ))}
      </div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center mr-2">
          {pageShowOptions && (
            <>
              {" "}
              <Label for="rows-per-page">Show</Label>
              <CustomInput
                className="form-control ml-50 pr-3"
                type="select"
                id="rows-per-page"
                value={pageSize}
                onChange={(e) => handlePageSize(e.target.value)}
              >
                {pageSizeOptions.map((data) => (
                  <option key={data} value={data.toString()}>
                    {data}
                  </option>
                ))}
              </CustomInput>
            </>
          )}
        </div>
        {
          withSearch &&
          <div className="d-flex">
            {filterCard}
            <InputGroup className="input-group-merge">
              <Input
                className="search-table2 w-50"
                type="text"
                name="search"
                id="search-master-user"
                placeholder="Search"
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSearchQuery();
                }}
                value={tempSearchQuery || searchQuery}
                onChange={(e) => {
                  if (
                    typeof tempSearchQuery !== "undefined" &&
                    typeof setTempSearchQuery !== "undefined"
                  )
                    setTempSearchQuery(e.target.value);
                  else setSearchQuery(e.target.value);
                }}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <Search size={14} />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </div>
        }
      </div>
    </>
  );
};

export default ListHeader;
