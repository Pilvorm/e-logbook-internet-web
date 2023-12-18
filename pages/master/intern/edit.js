import { SITE_DATA, DEPARTMENT_DATA } from "constant";
import BreadCrumbs from "components/custom/BreadcrumbCustom";
import React, { useState, useCallback, useEffect } from "react";
import { ComboAlert } from "components/Alert";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import VerticalLayout from "src/@core/layouts/VerticalLayout";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
  Spinner,
  Table,
  Row,
  Col,
  Card,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
} from "reactstrap";
import { Search, Save, Plus, Trash, ArrowLeft } from "react-feather";

import {
  confirmAlertNotification,
  errorAlertNotification,
  successAlertNotification,
} from "components/notification";

import UserOptionItem from "components/UserOptionItem";

import AsyncSelect from "react-select/async";
import { FieldArray, Formik } from "formik";
import * as yup from "yup";

import { wrapper } from "redux/store";
import { reauthenticate } from "redux/actions/auth";
import { connect, useDispatch } from "react-redux";
import { getAllRoles, getRolesByUPN } from "redux/actions/master/role";
import { searchRole, searchUser } from "helpers/master/masterRole";
import { getAllMasterUser, createMasterUser } from "redux/actions/master/userInternal";
import { searchCompany, getAsyncOptionsSBU } from "helpers/sbu";
import FormikDatePicker from "components/CustomInputs/CustomDatePicker";
import debounce from "lodash/debounce";

const MasterInternDetail = (props) => {
  const { dataRoles, sessionData, token } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: session, status } = useSession();
  console.log("Session Data");
  console.log(sessionData);

  useEffect(() => {
    dispatch(reauthenticate(token));
  }, [dispatch]);

  const [active, setActive] = useState("1");
  const [values, setValues] = useState(null);
  const toggle = (key) => setActive(key);

  // Handling user profile search
  const [selectedName, setSelectedName] = useState([]);

  // handling search site
  const getAsyncOptionsCompany = (inputText) => {
    return searchCompany(inputText).then((resp) => {
      return resp.data.map((singleData) => ({
        ...singleData,
        value: singleData.companyName,
        label: singleData.companyName,
      }));
    });
  };

  const loadOptionsCompany = useCallback(
    debounce((inputText, callback) => {
      if (inputText) {
        getAsyncOptionsCompany(inputText).then((options) => callback(options));
      }
    }, 1000),
    []
  );

  const getAsyncOptionsName = (inputText) => {
    return searchUser(inputText).then((resp) => {
      return resp.data.items.map((singleData) => ({
        ...singleData,
        value: singleData.nik,
        label: singleData.name,
      }));
    });
  };

  const loadOptionsName = useCallback(
    debounce((inputText, callback) => {
      if (inputText) {
        getAsyncOptionsName(inputText).then((options) => callback(options));
      }
    }, 1000),
    []
  );

  const [selectedCompany, setSelectedCompany] = useState({
    label: "Search...",
    value: "",
  });

  const [selectedDepartment, setSelectedDepartment] = useState({
    label: "Search...",
    value: "",
  });

  // Combo alert states
  const [isAlertModal, setIsAlertModal] = useState(false);
  const [alertStatus, setAlertStatus] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  // onSubmit
  const onSubmit = (values, actions) => {
    const {
      nik,
      userPrincipalName,
      name,
      email,
      companyCode,
      companyName,
      jabatan,
    } = values;

    let bodyData = {
      nik,
      userPrincipalName,
      name,
      email,
      userRoles: role,
      companyCode,
      companyName,
      applicationCode: "HSSEONLINE",
      jabatan,
      notes: "-",
      isActive: true,
      createdDate: new Date(),
      createdBy: sessionData?.user?.UserPrincipalName || "",
      updatedDate: new Date(),
      updatedBy: sessionData?.user?.UserPrincipalName || "",
    };

    if (bodyData.userRoles.length === 0) {
      return errorAlertNotification(
        "Validation Error",
        `Please select at least one role`
      );
    }

    if (bodyData.userPrincipalName.length === 0) {
      return errorAlertNotification(
        "Validation Error",
        `Username for ${bodyData.name} is not found, please contact helpdesk for further information.`
      );
    }

    confirmAlertNotification(
      "Add New User",
      "Apakah Anda yakin submit data ini?",
      () => {
        actions.setSubmitting(true);
        dispatch(createMasterUser(bodyData)).then((res) => {
          if (res.status >= 200 && res.status <= 300) {
            actions.setSubmitting(false);
            successAlertNotification("Success", "Data berhasil disimpan");
            router.push("/hsse/master/user");
          } else {
            actions.setSubmitting(false);
            console.error(res);
            errorAlertNotification(
              "Error",
              res?.data?.message ? res?.data?.message : "Data gagal disimpan."
            );
          }
        });
      },
      () => {
        actions.setSubmitting(false);
      }
    );
  };

  const validationSchema = yup
    .object({
      name: yup.string().required("Name is required"),
      // userPrincipalName: yup.string().required("User principal name is required"),
      // jabatan: yup.string().required("Job title is required"),
      // email: yup.string().required("Email is required"),
      // companyName: yup.string().required("Company name is required"),
    })
    .required();

  const DropdownIndicator = (props) => {
    return (
      <Search
        set="light"
        primaryColor="blueviolet"
        style={{ padding: "4px", marginRight: "2px" }}
      />
    );
  };

  return (
    <div className="min-vh-100">
      <BreadCrumbs breadCrumbParent="Master" breadCrumbParent2="Intern" breadCrumbActive="Edit" />
      <div className="d-flex align-items-center my-3">
        <h2>Edit Intern</h2>
      </div>

      <Card>
        <div className="px-2 py-2 mb-2">
          <Formik
            enableReinitialize
            initialValues={{
              nik: selectedName?.nik ?? "",
              userPrincipalName: selectedName?.userPrincipalName ?? "",
              name: selectedName?.name ?? "",
              email: selectedName?.email ?? "",
              userRoles: [],
              applicationCode: selectedName?.applicationCode ?? "",
              companyCode: selectedName?.compCode ?? "",
              companyName: selectedName?.compName ?? "",
              clusterCode: selectedName?.clusterCode ?? "",
              orgType: selectedName?.orgType ?? "",
              jabatan: selectedName?.jobTtlName ?? "",
              notes: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              setFieldValue,
              handleSubmit,
              handleChange,
              isSubmitting,
            }) => (
              <>
                {/* ACTIONS */}
                <div className="d-flex justify-content-between w-100 flex-wrap">
                  <div
                    className="d-flex flex-wrap"
                    style={{
                      gap: 20,
                      width: "70%",
                      paddingTop: "1rem",
                      paddingLeft: "2rem",
                    }}
                  >
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
                    <Button.Ripple
                      id="saveBtn"
                      color="primary"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner size="sm" color="white" />
                          <span className="ml-50">Submitting...</span>
                        </>
                      ) : (
                        <div
                          className="d-flex"
                          style={{ alignItems: "center" }}
                        >
                          <Save size={18} />
                          <div className="ml-1">Save</div>
                        </div>
                      )}
                    </Button.Ripple>
                  </div>
                </div>
                <Container>
                  <Row className="mt-3">
                    <Col md="6">
                      <FormGroup tag={Col} md="12">
                        <Label className="form-label font-weight-bold">
                          Name
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Name"
                          value={"Daniel Emerald Sumarly"}
                          //   defaultValue={selectedName?.userPrincipalName}
                          onChange={handleChange("name")}
                          disabled
                        />
                        {errors.name && (
                          <div className="text-danger">{errors.name}</div>
                        )}
                        {/* <AsyncSelect
                              // cacheOptions
                              id="nameSearch"
                              className="dropdownModal"
                              isSearchable
                              loadOptions={loadOptionsName}
                              components={{ DropdownIndicator }}
                              getOptionValue={(option) => option.value}
                              value={selectedName?.name}
                              formatOptionLabel={(data) => (
                                <UserOptionItem
                                  key={data?.id}
                                  profilePicture={
                                    data.profilePicturePath ||
                                    "/images/avatars/avatar-blank.png"
                                  }
                                  // name={`${data?.name} (${data?.email ?? "UPN N/A"})`}
                                  name={`${data?.name} (${data?.userPrincipalName})`}
                                  subtitle={data?.compName}
                                />
                              )}
                              onChange={(e) => {
                                setFieldValue("name", e.name);
                                setSelectedName(e);
                                findUser(e.name);
                                setRole([]);
                                setFieldValue("userRoles", []);
                              }}
                              placeholder={
                                selectedName?.name || "Search by name or email"
                              }
                            /> */}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup tag={Col} md="12">
                        <Label className="form-label font-weight-bold">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="text"
                          placeholder="Email"
                          value={"daniel.sumarly@binus.ac.id"}
                          // defaultValue={selectedName?.email}
                          onChange={handleChange("email")}
                          disabled
                        />
                        {errors.email && (
                          <div className="text-danger">{errors.email}</div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup tag={Col} md="12">
                        <Label className="form-label font-weight-bold">
                          School/College
                        </Label>
                        <Input
                          id="school"
                          type="text"
                          placeholder="School/College"
                          value={"Binus University"}
                          //   defaultValue={selectedName?.userPrincipalName}
                          onChange={handleChange("school")}
                          disabled
                        />
                        {errors.school && (
                          <div className="text-danger">{errors.school}</div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup tag={Col} md="12">
                        <Label className="form-label font-weight-bold">
                          Faculty
                        </Label>
                        <Input
                          id="faculty"
                          type="text"
                          placeholder="Job Title Name"
                          value={"Computer Science"}
                          //   defaultValue={selectedName?.jobTtlName}
                          onChange={handleChange("faculty")}
                          disabled
                        />
                        {errors.faculty && (
                          <div className="text-danger">{errors.faculty}</div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup tag={Col} md="12">
                        <Label className="form-label font-weight-bold">
                          Site
                        </Label>
                        <AsyncSelect
                          id="companyCode"
                          name="companyCode"
                          classNamePrefix="select"
                          cacheOptions
                          value={{
                            label: selectedDepartment.label,
                            value: selectedDepartment.value,
                          }}
                          defaultOptions={SITE_DATA}
                          onChange={(e) => {
                            setSelectedDepartment(e);
                          }}
                          placeholder="Search..."
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup tag={Col} md="12">
                        <Label className="form-label font-weight-bold">
                          Department
                        </Label>
                        <AsyncSelect
                          id="companyCode"
                          name="companyCode"
                          classNamePrefix="select"
                          cacheOptions
                          value={{
                            label: selectedCompany.label,
                            value: selectedCompany.value,
                          }}
                          defaultOptions={DEPARTMENT_DATA}
                          onChange={(e) => {
                            setSelectedCompany(e);
                          }}
                          placeholder="Search..."
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup tag={Col} md="12">
                        <Label className="form-label font-weight-bold">
                          Mentor
                        </Label>
                        <AsyncSelect
                          // cacheOptions
                          id="nameSearch"
                          className="dropdownModal"
                          isSearchable
                          loadOptions={loadOptionsName}
                          components={{ DropdownIndicator }}
                          getOptionValue={(option) => option.value}
                          value={selectedName?.name}
                          formatOptionLabel={(data) => (
                            <UserOptionItem
                              key={data?.id}
                              profilePicture={
                                data.profilePicturePath ||
                                "/images/avatars/avatar-blank.png"
                              }
                              // name={`${data?.name} (${data?.email ?? "UPN N/A"})`}
                              name={`${data?.name} (${data?.userPrincipalName})`}
                              subtitle={data?.compName}
                            />
                          )}
                          onChange={(e) => {
                            setFieldValue("name", e.name);
                            setSelectedName(e);
                            findUser(e.name);
                            setRole([]);
                            setFieldValue("userRoles", []);
                          }}
                          placeholder={
                            selectedName?.name || "Search by name or email"
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <Row>
                        <Col md="6">
                          <FormGroup tag={Col} md="12">
                            <FormikDatePicker
                              label="Internship Start Date"
                              name="startDate"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup tag={Col} md="12">
                            <FormikDatePicker
                              label="Internship End Date"
                              name="endDate"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </>
            )}
          </Formik>
          <ComboAlert
            routerPath="/master/intern"
            {...{
              isAlertModal,
              setIsAlertModal,
              alertStatus,
              alertMessage,
            }}
          />
        </div>
      </Card>
    </div>
  );
};

MasterInternDetail.getLayout = function getLayout(page) {
  return <VerticalLayout>{page}</VerticalLayout>;
};

//Render Data
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

    const token = sessionData.user.token;
    store.dispatch(reauthenticate(token));

    await store.dispatch(getAllRoles());
    const dataRoles = store.getState().masterRoleReducers;

    // await store.dispatch(
    //   getAllMasterUser(
    //     query.pageNumber || 1,
    //     query.pageSize || 1000,
    //     query.search || "",
    //     query.name || ""
    //   )
    // );

    // const dataMasterUser = store.getState().masterUserReducers;

    return {
      props: {
        token: sessionData.user.token,
        dataRoles,
        sessionData,
      },
    };
  }
);

export default MasterInternDetail;
