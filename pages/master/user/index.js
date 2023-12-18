import { HTTP_CODE, SYSTEM_ADMIN, SUPER_USER } from "constant";

import BreadCrumbs from "components/custom/BreadcrumbCustom";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit,
  Filter,
  MoreVertical,
  Plus,
  Trash,
} from "react-feather";
import ReactPaginate from "react-paginate";
import {
  Button,
  Card,
  Col,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap";

import { connect, useDispatch } from "react-redux";
import { reauthenticate } from "redux/actions/auth";
import {
  getAllMasterUser,
  deleteMasterUser,
  getSbuAsyncSelect,
  getAllMasterUserInternal,
} from "redux/actions/master/userInternal";
import { wrapper } from "redux/store";

import {
  confirmAlertNotification,
  errorAlertNotification,
  successAlertNotification,
  deleteAlertNotification,
} from "components/notification";

import ModalFilterUser from "components/modal/filter/ModalFilterUser";
import { getPermissionComponentByRoles } from "helpers/getPermission";
import VerticalLayout from "src/@core/layouts/VerticalLayout";

const MasterUser = (props) => {
  const { dataMasterUser, dataSBU, query, token, dataFilter, sessionData } =
    props;
  const dispatch = useDispatch();
  const router = useRouter();

  console.log("MASTER USER");
  console.log(dataMasterUser);

  const pageSizeOptions = [5, 10, 15, 20];
  const [pageSize, setPageSize] = useState(query?.pageSize ?? 10);
  const [pageNumber, setPageNumber] = useState(query?.pageNumber ?? 1);
  const [searchQuery, setSearchQuery] = useState(query?.search ?? "");
  const [filterQuery, setFilterQuery] = useState(
    query?.filter
      ? { ...JSON.parse(query?.filter) }
      : {
          name: "",
          userPrincipalName: "",
          compName: "",
          email: "",
          roleName: "",
        }
  );

  const [visibleFilter, setVisibleFilter] = useState(false);
  const toggleFilterPopup = () => setVisibleFilter(!visibleFilter);

  useEffect(() => {
    dispatch(reauthenticate(token));
  }, [dispatch]);

  const handlePageSize = (value) => {
    setPageSize(value);

    router.push({
      pathname: router.pathname,
      query: {
        pageSize: value,
        pageNumber: 1,
        search: searchQuery,
        filter: JSON.stringify(filterQuery),
      },
    });
  };

  const handlePagination = (page) => {
    setPageNumber(page.selected + 1);

    router.push({
      pathname: router.pathname,
      query: {
        pageSize: pageSize,
        pageNumber: page.selected + 1,
        search: searchQuery,
        filter: JSON.stringify(filterQuery),
      },
    });
  };

  const handleSearchQuery = () => {
    router.push({
      pathname: router.pathname,
      query: {
        pageSize: pageSize,
        pageNumber: 1,
        search: searchQuery,
        filter: JSON.stringify(filterQuery),
      },
    });
  };

  const handleFilterQuery = (param) => {
    router.push({
      pathname: router.pathname,
      query: {
        pageSize: pageSize,
        pageNumber: 1,
        search: searchQuery,
        filter: JSON.stringify(param),
      },
    });
  };

  const handleDelete = (e, data) => {
    e.preventDefault();
    confirmAlertNotification(
      "Delete Item",
      "Are you sure to delete this user?",
      () => {
        dispatch(deleteMasterUser(data.id)).then((res) => {
          console.log(res);
          if (res.status === HTTP_CODE.UNAUTHORIZED) {
            errorAlertNotification(
              "Error",
              "Something went wrong, Please try again later."
            );
          } else if (res.status === 200) {
            successAlertNotification(
              "Deleted Success",
              "Successfully Deleted User"
            );
            router.push({
              pathname: router.pathname,
              query: { pageSize, pageNumber, searchQuery },
            });
          } else {
            errorAlertNotification(
              "Error",
              "Something went wrong, Please try again later."
            );
          }
        });
      }
    );
  };

  return (
    <div>
      <BreadCrumbs breadCrumbParent="Master" breadCrumbActive="User" />
      <div className="d-flex align-items-center my-3">
        <Button.Ripple
          outline
          type="submit"
          color="danger"
          className="btn-next"
          onClick={() => router.back()}
        >
          <ArrowLeft size={18} />
          <span className="ml-50 align-middle d-sm-inline-block d-none">
            Back
          </span>
        </Button.Ripple>

        <h2 className={`ml-2 pl-2 border-left-dark`}>Master User</h2>
      </div>

      <Card className="p-2">
        <ModalFilterUser
          visible={visibleFilter}
          toggle={toggleFilterPopup}
          sessionData={sessionData}
          handleFilterQuery={handleFilterQuery}
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
        />
        <div className="d-flex align-items-center">
          <Button.Ripple
            color="primary"
            id="buttonFilter"
            name="buttonFilter"
            className="btn-next mr-1"
            onClick={() => setVisibleFilter(true)}
          >
            <Filter size={18} />
            <span className="align-middle ml-1 d-sm-inline-block d-none">
              Filter
            </span>
          </Button.Ripple>
        </div>
      </Card>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center mr-2">
          <Label for="rows-per-page">Show</Label>
          <CustomInput
            className="form-control ml-50 pr-3"
            type="select"
            id="rows-per-page"
            value={pageSize}
            onChange={(e) => handlePageSize(e.target.value)}
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </CustomInput>
        </div>

        <div className="d-flex align-items-center">
          <div className="mr-2">
            <Input
              className="search-table2"
              type="text"
              name="search"
              placeholder="Search"
              value={searchQuery}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSearchQuery();
              }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center">
            <Button.Ripple
              color="primary"
              id="buttonCreate"
              name="buttonCreate"
              className="btn-next mr-1"
              onClick={() => router.push("/master/user/add")}
            >
              <Plus size={18} />
              <span className="align-middle ml-1 d-sm-inline-block d-none">
                Add New User
              </span>
            </Button.Ripple>
          </div>
        </div>
      </div>
      <Table responsive className="border">
        <thead className="text-center">
          <tr>
            <th>Action</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Site</th>
            <th>Jabatan</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody className="text-center text-break">
          {dataMasterUser &&
            dataMasterUser.data.map((user) => (
              <tr key={user.nik}>
                <td>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="icon-btn hide-arrow"
                      id="optionsSelect"
                      color="transparent"
                      size="sm"
                      caret
                    >
                      <MoreVertical size={15} />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        className="w-100"
                        onClick={() =>
                          router.push(`/master/user/${user.id}/edit`)
                        }
                        id="editBtn"
                      >
                        <Edit className="mr-50" size={15} />
                        <span className="align-middle">Edit</span>
                      </DropdownItem>
                      <DropdownItem
                        className="w-100"
                        onClick={(e) => handleDelete(e, user)}
                        id="deleteBtn"
                      >
                        <Trash className="mr-50" size={15} />
                        <span className="align-middle">Delete</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
                <td className="text-uppercase">{user.name}</td>
                <td className="text-lowercase">{user.userPrincipalName}</td>
                <td className="text-lowercase">{user.email}</td>
                <td>{user.compName}</td>
                <td>{user.jobTitle}</td>
                <td>
                  {user.userRoles.map((users, index, obj) => (
                    <span key={users.nik}>
                      {users.roleName}
                      {index + 1 !== obj.length && ", "}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Row className="mt-1 mb-3">
        <Col
          className="d-flex align-items-center justify-content-start"
          md="9"
          sm="12"
        >
          <p className="mb-0" style={{ color: "#b9b9c3" }}>
            Showing 1 to {pageSize} of {dataMasterUser.totalData} entries
          </p>
        </Col>
        <Col
          className="d-flex align-items-center justify-content-end"
          md="3"
          sm="12"
        >
          <ReactPaginate
            onPageChange={(page) => handlePagination(page)}
            forcePage={pageNumber - 1}
            pageCount={dataMasterUser.totalPage || 1}
            nextLabel={""}
            breakLabel={"..."}
            activeClassName={"active"}
            pageClassName={"page-item"}
            previousLabel={""}
            nextLinkClassName={"page-link"}
            nextClassName={"page-item next-item"}
            previousClassName={"page-item prev-item"}
            previousLinkClassName={"page-link"}
            pageLinkClassName={"page-link"}
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName={"pagination react-paginate m-0"}
          />
        </Col>
      </Row>
    </div>
  );
};

MasterUser.getLayout = function getLayout(page) {
  return <VerticalLayout>{page}</VerticalLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { query } = ctx;
    const sessionData = await getSession(ctx);

    if (!sessionData) {
      return {
        redirect: {
          destination: `/auth?url=${ctx.resolvedUrl}`,
          permanent: false,
        },
      };
    }

    const dataSBU = await store.dispatch(getSbuAsyncSelect());

    const token = sessionData.user.token;

    store.dispatch(reauthenticate(token));

    const formatFilter = (filterData) => {
      const filteredFilter = Object.entries(filterData).filter(
        (data) => data[1] !== ""
      );
      const finalFilter = filteredFilter
        .map((data) => `${data[0]}=${data[1]}`)
        .join("|");

      return finalFilter;
    };

    await store.dispatch(
      getAllMasterUserInternal({
        "CSTM-COMPID": sessionData.user.CompCode,
        "CSTM-NAME": sessionData.user.Name,
        "CSTM-EMAIL": sessionData.user.Email,
        "CSTM-ROLE": JSON.parse(sessionData.user.Roles)[0],
        "CSTM-UPN": sessionData.user.UserPrincipalName,
        "X-PAGINATION": true,
        "X-PAGE": query.pageNumber || 1,
        "X-PAGESIZE": query.pageSize || 10,
        "X-ORDERBY": "createdDate desc",
        "X-SEARCH": `*${query.search || ""}*`,
        "X-FILTER": `${
          query?.filter ? formatFilter(JSON.parse(query?.filter)) : ""
        }`,
      })
    );

    const dataMasterUser = store.getState().masterUserReducers;

    return {
      props: {
        dataMasterUser,
        query,
        token,
        dataSBU,
        dataFilter: query,
        sessionData,
      },
    };
  }
);

export default connect((state) => state)(MasterUser);
