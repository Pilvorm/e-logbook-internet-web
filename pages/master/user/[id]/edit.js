import BreadCrumbs from "components/custom/BreadcrumbCustom";
import { Formik, useField } from "formik";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "react-feather";
import { connect, useDispatch } from "react-redux";
import {
  Button,
  Card,
  Col,
  Container,
  CustomInput,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  Spinner,
  TabContent,
  TabPane,
} from "reactstrap";
import { reauthenticate } from "redux/actions/auth";
import { getAllRoles } from "redux/actions/master/role";
import {
  getMasterUser,
  getMasterUserById,
  updateMasterUser,
} from "redux/actions/master/user";
import { wrapper } from "redux/store";
import * as yup from "yup";

import VerticalLayout from "src/@core/layouts/VerticalLayout";
import {
  confirmAlertNotification,
  errorAlertNotification,
  successAlertNotification,
} from "components/notification";
import { transformYupErrorsIntoObject } from "helpers/shared";
import { useRouter } from "next/router";

function InputField({ name, ...props }) {
  const [field, meta, helpers] = useField(name);

  const { value } = meta;
  const { setValue } = helpers;

  const showError = Boolean(meta.touched && meta.error);

  return (
    <>
      <Input
        invalid={showError}
        id={props.id}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
      {showError && <FormFeedback>{meta.error}</FormFeedback>}
    </>
  );
}

function RoleCheckboxes({ name, roles, ...props }) {
  const [field, meta, helpers] = useField(name);

  const { value } = meta;
  const { setValue } = helpers;

  const handleCheckboxChange = (role) => (e) => {
    const isChecked = e.target.checked;
    const isAlreadyInArray =
      value.findIndex((roleItem) => roleItem.roleCode === role.roleCode) !== -1;

    // 4 cases:
    // 1. checked, not in array -> add to array
    // 2. checked, in array -> do nothing
    // 3. unchecked, in array -> remove from array
    // 4. unchecked, not in array -> do nothing
    if (isChecked && !isAlreadyInArray) {
      setValue([...value, role]);
    } else if (!isChecked && isAlreadyInArray) {
      setValue(value.filter((roleItem) => roleItem.roleCode !== role.roleCode));
    }
  };

  return roles.map((role) => (
    <CustomInput
      key={role.roleCode}
      id={role.roleCode}
      label={role.roleName}
      inline
      {...props}
      className="mb-1 mr-2"
      type="checkbox"
      name={name}
      onChange={handleCheckboxChange(role)}
      checked={
        value.findIndex((roleItem) => roleItem.roleCode === role.roleCode) !==
        -1
      }
    />
  ));
}

function EditMasterUser(props) {
  const { token, query, data, dataRoles } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const [active, setActive] = useState("1");
  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  useEffect(() => {
    dispatch(reauthenticate(token));
  }, [dispatch]);

  return (
    <div className="min-vh-100">
      <BreadCrumbs
        breadCrumbParent="Master"
        breadCrumbParent2="User"
        breadCrumbActive="Edit"
      />
      <div className="d-flex align-items-center my-3">
        <h2>Edit User</h2>
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

      <Card className="px-2 py-2 mb-2">
        <TabContent className="ml-1 py-50" activeTab={active}>
          <TabPane tabId="1">
            <Formik
              enableReinitialize
              initialValues={{
                userPrincipalName: data?.userPrincipalName ?? "",
                nik: data?.nik ?? "",
                name: data?.name ?? "",
                email: data?.email ?? "",
                jobTitle: data?.jobTitle ?? "",
                deptName: data?.deptName ?? "",
                compCode: data?.compCode ?? "",
                compName: data?.compName ?? "",
                userRoles: data?.userRoles ?? [],
              }}
              onSubmit={async (values, actions) => {
                if (values.userRoles.length === 0) {
                  errorAlertNotification(
                    "Validation Error",
                    "Please select at least one role"
                  );
                  return;
                }

                const payload = {
                  ...data,
                  // ...values,
                  userRoles: values.userRoles.map((role) => {
                    return {
                      roleCode: role.roleCode,
                      roleName: role.roleName,
                    };
                  }),
                };

                confirmAlertNotification(
                  "Add New User",
                  "Are you sure to update this user?",
                  () => {
                    actions.setSubmitting(true);
                    dispatch(updateMasterUser(data.id, payload)).then((res) => {
                      if (res.status >= 200 && res.status <= 300) {
                        actions.setSubmitting(false);
                        successAlertNotification(
                          "Success",
                          "User updated succesfully"
                        );
                        router.push("/master/user");
                      } else {
                        actions.setSubmitting(false);
                        errorAlertNotification(
                          "Error",
                          res?.data?.message
                            ? res?.data?.message
                            : "Failed to save data"
                        );
                      }
                    });
                  },
                  () => {
                    actions.setSubmitting(false);
                  }
                );
              }}
            >
              {({
                values,
                errors,
                setFieldValue,
                handleSubmit,
                handleChange,
                isSubmitting,
              }) => {
                console.log(isSubmitting, "SUBMITTING");
                return (
                  <Form onSubmit={handleSubmit}>
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
                          type="submit"
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
                      <Container className="mt-3">
                        <Row>
                          <Col md="6">
                            <FormGroup tag={Col} md="12">
                              <Label className="form-label font-weight-bold">
                                NIK
                              </Label>
                              <InputField name="nik" disabled />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup tag={Col} md="12">
                              <Label className="form-label font-weight-bold">
                                Name
                              </Label>
                              <InputField name="name" disabled />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6">
                            <FormGroup tag={Col} md="12">
                              <Label className="form-label font-weight-bold">
                                User Principal Name
                              </Label>
                              <InputField name="userPrincipalName" disabled />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup tag={Col} md="12">
                              <Label className="form-label font-weight-bold">
                                Email
                              </Label>
                              <InputField name="email" disabled />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6">
                            <FormGroup tag={Col} md="12">
                              <Label className="form-label font-weight-bold">
                                Company
                              </Label>
                              <InputField name="compName" disabled />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup tag={Col} md="12">
                              <Label className="form-label font-weight-bold">
                                Jabatan
                              </Label>
                              <InputField name="jobTitle" disabled />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col md="12">
                            <div
                              className="mx-1 d-flex flex-column gap-3"
                              style={{ gap: "16px" }}
                            >
                              <h5>Role</h5>
                              <div>
                                {dataRoles && (
                                  <RoleCheckboxes
                                    name="userRoles"
                                    roles={dataRoles}
                                  />
                                )}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </TabPane>
        </TabContent>
      </Card>
    </div>
  );
}

EditMasterUser.getLayout = function getLayout(page) {
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

    const token = sessionData.user.token;
    store.dispatch(reauthenticate(token));

    const response = await store.dispatch(getMasterUserById(query.id));

    if (response.status !== 200) {
      return {
        redirect: {
          destination: "/master/user",
          permanent: false,
        },
      };
    }

    const dataRoles = await store.dispatch(getAllRoles());

    return {
      props: {
        query,
        token,
        data: response.data,
        dataRoles,
      },
    };
  }
);

export default connect((state) => state)(EditMasterUser);
