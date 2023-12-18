import { ROLE_DATA } from "constant";
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
import { Search, Save, Edit, Check, Plus, Trash, ArrowLeft } from "react-feather";

import {
  confirmAlertNotification,
  errorAlertNotification,
  successAlertNotification,
} from "components/notification";

import UserOptionItem from "components/UserOptionItem";

import AsyncSelect from "react-select/async";
import { FieldArray, Formik } from "formik";
import * as yup from "yup";
import CustomRadio from "components/CustomInputs/CustomRadio";

import { wrapper } from "redux/store";
import { reauthenticate } from "redux/actions/auth";
import { connect, useDispatch } from "react-redux";
import { getAllRoles, getRolesByUPN } from "redux/actions/master/role";
import { searchRole, searchUser } from "helpers/master/masterRole";
import {
  getAllMasterUser,
  createMasterUser,
  getAllMasterUserInternal,
} from "redux/actions/master/userInternal";
import { getAllAllowance } from "redux/actions/master/allowance";
import debounce from "lodash/debounce";

const AddMasterUser = (props) => {
  const { dataMasterAllowance, sessionData, token } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  console.log(dataMasterAllowance);

  const { data: session, status } = useSession();

  const [isEditing, setEditing] = useState(false);

  const [allowance, setAllowance] = useState({
    wfh: dataMasterAllowance?.data[0].allowanceFee,
    wfo: dataMasterAllowance?.data[1].allowanceFee,
  });

  useEffect(() => {
    dispatch(reauthenticate(token));
  }, [dispatch]);

  const [active, setActive] = useState("1");
  const [values, setValues] = useState(null);
  const toggle = (key) => setActive(key);

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
      jobTitle,
      deptName,
      compCode,
      compName,
    } = values;

    let bodyData = {
      userPrincipalName,
      nik,
      name,
      email,
      jobTitle,
      deptName,
      userRoles: role,
      compCode,
      compName,
      createdDate: new Date(),
      createdBy: sessionData?.user?.UserPrincipalName || "",
      updatedDate: new Date(),
      updatedBy: sessionData?.user?.UserPrincipalName || "",
    };

    if (bodyData.userRoles.length === 0) {
      return errorAlertNotification("Validation Error", `Please select a role`);
    }

    if (bodyData.userPrincipalName.length === 0) {
      return errorAlertNotification(
        "Validation Error",
        `Username for ${bodyData.name} is not found, please contact helpdesk for further information.`
      );
    }

    confirmAlertNotification(
      "Add New User",
      "Are you sure to add new user?",
      () => {
        actions.setSubmitting(true);
        dispatch(createMasterUser(bodyData)).then((res) => {
          if (res.status >= 200 && res.status <= 300) {
            actions.setSubmitting(false);
            successAlertNotification("Success", "Data saved succesfully");
            router.push("/master/user");
          } else {
            actions.setSubmitting(false);
            console.error(res);
            errorAlertNotification(
              "Error",
              res?.data?.message ? res?.data?.message : "Failed to save data"
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
      <BreadCrumbs breadCrumbParent="Master" breadCrumbActive="Allowance" />
      <div className="d-flex align-items-center my-3">
        <h2>Master Allowance</h2>
      </div>

      <Nav tabs>
        <NavItem>
          <NavLink
            active={active === "1"}
            onClick={() => {
              toggle("1");
            }}
            className={`${active === "1" ? "text-dark" : "text-muted"}`}
          >
            Data
          </NavLink>
        </NavItem>
      </Nav>

      <Card>
        <div className="px-2 py-2 mb-2">
          <TabContent className="ml-1 py-50" activeTab={active}>
            <TabPane tabId="1">
              <Formik
                enableReinitialize
                initialValues={{
                  wfhAllowanceFee: allowance.wfh.toLocaleString("de-DE") ?? "",
                  wfoAllowanceFee: allowance.wfo.toLocaleString("de-DE") ?? "",
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
                      </div>
                    </div>
                    <Container>
                      <Row className="mt-3">
                        <Col md="6">
                          <div className="d-flex flex-column mx-1">
                            <span>Current</span>
                            <span>
                              WFH:{" "}
                              {dataMasterAllowance?.data[0].allowanceFee.toLocaleString(
                                "de-DE"
                              )}
                            </span>
                            <span>
                              WFO:{" "}
                              {dataMasterAllowance?.data[1].allowanceFee.toLocaleString(
                                "de-DE"
                              )}
                            </span>
                          </div>
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col md="6">
                          <FormGroup tag={Col} md="12">
                            <Label className="form-label font-weight-bold">
                              WFH (Work from Home) Allowance
                            </Label>
                            <div className="d-flex align-items-center">
                              <Input
                                id="wfhAllowance"
                                type="text"
                                placeholder="WFH Allowance"
                                value={values.wfhAllowanceFee}
                                onChange={(e) => {
                                  setFieldValue(
                                    "wfhAllowanceFee",
                                    Number(
                                      e.target.value.split(".").join("")
                                    ).toLocaleString("de-DE")
                                  );
                                }}
                                onKeyPress={(e) => {
                                  if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                                disabled={!isEditing}
                              />
                              <Button.Ripple
                                color="warning"
                                className="btn-next ml-3"
                                onClick={() => router.back()}
                                height="100px"
                              >
                                <Edit size={18} />
                              </Button.Ripple>
                              <Button.Ripple
                                color="primary"
                                className="btn-next ml-1"
                                onClick={() => router.back()}
                                height="100px"
                              >
                                <Check size={18} />
                              </Button.Ripple>
                            </div>
                            {errors.userPrincipalName && (
                              <div className="text-danger">
                                {errors.userPrincipalName}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup tag={Col} md="12">
                            <Label className="form-label font-weight-bold">
                              WFO (Work from Office) Allowance
                            </Label>
                            <div className="d-flex align-items-center">
                              <Input
                                id="wfoAllowance"
                                type="text"
                                placeholder="WFO Allowance"
                                value={values.wfoAllowanceFee}
                                onChange={(e) => {
                                  setFieldValue(
                                    "wfhAllowanceFee",
                                    Number(
                                      e.target.value.split(".").join("")
                                    ).toLocaleString("de-DE")
                                  );
                                }}
                                onKeyPress={(e) => {
                                  if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                                disabled={!isEditing}
                              />
                              <Button.Ripple
                                color="warning"
                                className="btn-next ml-3"
                                onClick={() => router.back()}
                                height="100px"
                              >
                                <Edit size={18} />
                              </Button.Ripple>
                              <Button.Ripple
                                color="primary"
                                className="btn-next ml-1"
                                onClick={() => router.back()}
                                height="100px"
                              >
                                <Check size={18} />
                              </Button.Ripple>
                            </div>
                            {errors.email && (
                              <div className="text-danger">{errors.email}</div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                    </Container>
                  </>
                )}
              </Formik>
              <ComboAlert
                routerPath="/master/allowance"
                {...{
                  isAlertModal,
                  setIsAlertModal,
                  alertStatus,
                  alertMessage,
                }}
              />
            </TabPane>
          </TabContent>
        </div>
      </Card>
    </div>
  );
};

AddMasterUser.getLayout = function getLayout(page) {
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

    await store.dispatch(getAllAllowance());

    const dataMasterAllowance = store.getState().masterAllowanceReducers;

    return {
      props: {
        token: sessionData.user.token,
        dataMasterAllowance,
        sessionData,
      },
    };
  }
);

export default AddMasterUser;
