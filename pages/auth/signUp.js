import { EDUCATION_DATA, SITE_DATA, DEPARTMENT_DATA } from "constant";
import Link from "next/link";
import Image from "next/image";
import InputPasswordToggle from "src/@core/components/input-password-toggle";
import {
  Card,
  Container,
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import { getCsrfToken, getSession, signIn } from "next-auth/react";
import { useState, useEffect, useReducer, useCallback } from "react";
import metadata from "appsettings.json";
import InputUsernameIcon from "src/@core/components/input-username-icon";
import { useRouter } from "next/router";
import {
  confirmAlertNotification,
  errorAlertNotification,
  errorAlertNotificationCode,
  errorAlertNotificationGlobal,
  successAlertNotification,
} from "components/notification";
import { onLoginGuest } from "helpers/auth";
import jwt_decode from "jwt-decode";
import useMobileDetector from "components/useMobileDetector";
const sign = require("jwt-encode");
import AsyncSelect from "react-select/async";
import { FieldArray, Formik } from "formik";
import * as yup from "yup";
import { Search, Save, Plus, Trash, ArrowLeft } from "react-feather";
import { searchRole, searchUser } from "helpers/master/masterRole";
import { connect, useDispatch } from "react-redux";
import debounce from "lodash/debounce";
import UserOptionItem from "components/UserOptionItem";
import FormikDatePicker from "components/CustomInputs/CustomDatePicker";

import { getAsyncOptionsSchool } from "helpers/master/masterSchool";
import { getAsyncOptionsFaculty } from "helpers/master/masterFaculty";
import { getAsyncOptionsDepartment } from "helpers/master/masterDepartment";

import { getSchoolAsyncSelect } from "redux/actions/master/school";
import { getFacultyAsyncSelect } from "redux/actions/master/faculty";
import { getDepartmentAsyncSelect } from "redux/actions/master/department";

import { createMasterIntern } from "redux/actions/master/intern";

import { wrapper } from "redux/store";

const LoginPage = (props) => {
  const { dataSchool, dataFaculty, dataDepartment, csrfToken, query } = props;
  const isMobileWidth = useMobileDetector();
  const router = useRouter();
  const [loginLoading, setLoginLoading] = useState(false);
  const [isError, setIsError] = useState(query.error == "true" ? true : false);
  const [isErrorValidate, setIsErrorValidate] = useState(
    query.isError == "true" || query.invalid == "true" ? true : false
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedSchool, setSelectedSchool] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState([]);
  const [emailUser, setEmailUser] = useState("");
  const secret = process.env.NEXT_PUBLIC_API_SECRET_KEY_JWT ?? "";

  const [detailForm, setDetailForm] = useState(false);

  const dispatch = useDispatch();

  const [selectedCompany, setSelectedCompany] = useState({
    label: "Search...",
    value: "",
  });

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

  const loadOptionsSchool = useCallback(
    debounce((inputText, callback) => {
      if (inputText) {
        getAsyncOptionsSchool(inputText).then((options) => callback(options));
      }
    }, 1000),
    []
  );

  const loadOptionsFaculty = useCallback(
    debounce((inputText, callback) => {
      if (inputText) {
        getAsyncOptionsFaculty(inputText).then((options) => callback(options));
      }
    }, 1000),
    []
  );

  const loadOptionsDepartment = useCallback(
    debounce((inputText, callback) => {
      if (inputText) {
        getAsyncOptionsDepartment(inputText).then((options) =>
          callback(options)
        );
      }
    }, 1000),
    []
  );

  useEffect(() => {
    if (query.error == "true") {
      setTimeout(() => {
        setIsError(false);
      }, 100);
    }
    if (query.isError == "true" || query.invalid == "true") {
      setTimeout(() => {
        setIsErrorValidate(false);
      }, 100);
    }
  }, []);

  const handleContinue = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    const loginData = {
      name: name,
      email: email,
    };
    if (name === null || name === "") {
      setLoginLoading(false);
      return errorAlertNotification(
        "Error",
        "Mohon mengisi Name terlebih dahulu"
      );
    }
    if (email === null || email === "") {
      setLoginLoading(false);
      return errorAlertNotification(
        "Error",
        "Mohon mengisi Email terlebih dahulu"
      );
    }
    const regex =
      /^([A-Za-z0-9_\-\.])+\@(?!(?:[A-Za-z0-9_\-\.]+\.)?com\.com)([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!regex.test(email)) {
      setLoginLoading(false);
      return errorAlertNotification(
        "Error",
        "Format alamat email yang anda input salah"
      );
    }
    try {
      return onLoginGuest(loginData)
        .then((data) => {
          if (data.status === 400) {
            setLoginLoading(false);
            let a = "";
            if (data.statusText.Name) {
              setErrorMessage(data.statusText.Name[0] ?? "");
              a = data.statusText.Name[0];
            } else {
              setErrorMessage(data.statusText.Email[0] ?? "");
              a = data.statusText.Email[0];
            }
            setError(true);
            return errorAlertNotification("Error", a);
          }
          if (data.securityCode) {
            const emailEncode = sign(email, secret);
            const nameEncode = sign(name, secret);
            localStorage.setItem("name", nameEncode);
            localStorage.setItem("email", emailEncode);
            if (typeof window !== "undefined") {
            }
            router.push({
              pathname: router.pathname,
              query: `validate=${true}`,
            });
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      throw new Error("There was an error on user authentication");
    }
  };

  const onSubmit = (values, actions) => {
    const {
      userPrincipalName,
      name,
      education,
      schoolCode,
      schoolName,
      facultyCode,
      faculty,
      deptCode,
      dept,
      password,
      status,
      joinDate,
      endDate,
      mentorUpn,
      mentorName,
      companyCode,
      companyName,
      internshipPeriodMonth,
      userRole,
    } = values;

    let bodyData = {
      userPrincipalName,
      name,
      education,
      schoolCode,
      schoolName,
      facultyCode,
      faculty,
      deptCode,
      dept,
      password,
      status,
      joinDate,
      endDate,
      mentorUpn,
      mentorName,
      companyCode,
      companyName,
      internshipPeriodMonth,
      userRole,
    };

    console.log("BODY DATA");
    console.log(bodyData);

    // confirmAlertNotification(
    //   "Complete Registration",
    //   "Confirm information details?",
    //   () => {
    //     actions.setSubmitting(true);
    //     dispatch(createMasterIntern(bodyData)).then((res) => {
    //       if (res.status >= 200 && res.status <= 300) {
    //         actions.setSubmitting(false);
    //         successAlertNotification("Success", "Registered Succesfully");
    //         router.push("/auth");
    //       } else {
    //         actions.setSubmitting(false);
    //         console.error(res);
    //         errorAlertNotification(
    //           "Error",
    //           res?.data?.message ? res?.data?.message : "Failed to save data"
    //         );
    //       }
    //     });
    //   },
    //   () => {
    //     actions.setSubmitting(false);
    //   }
    // );
  };

  const validationSchema = yup
    .object({
      name: yup.string().required("Name is required"),
      education: yup.string().required("Required"),
      schoolName: yup.string().required("School/College is required"),
      companyName: yup.string().required("Company is required")
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
    <Formik
      enableReinitialize
      initialValues={{
        userPrincipalName: username,
        name: "",
        education: "",
        schoolCode: selectedSchool.schoolCode,
        schoolName: selectedSchool.schoolName,
        facultyCode: selectedFaculty.facultyCode,
        faculty: selectedFaculty.facultyCode,
        faculty: selectedFaculty.facultyName,
        deptCode: selectedDepartment.departmenetCode,
        dept: selectedDepartment.departmentName,
        password: password,
        status: "UNCONFIRMED",
        joinDate: new Date(),
        endDate: new Date(),
        mentorUpn: selectedMentor.userPrincipalName,
        mentorName: selectedMentor.name,
        companyCode: 1,
        companyName: "PT XYZ Tbk.",
        internshipPeriodMonth: 12,
        userRole: {
          roleCode: "INTERN",
          roleName: "INTERN",
        },
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
        <div className="auth-wrapper auth-v2 d-flex justify-content-center">
          {isError == true ? <AlertError /> : null}
          {isErrorValidate == true ? <AlertErrorValidate /> : null}
          {!detailForm ? (
            <Row className="auth-inner m-0">
              <Col
                className="d-flex align-items-center auth-bg px-2 p-lg-5"
                lg="12"
                sm="12"
              >
                <Col
                  className="h-100 d-flex flex-column justify-content-between px-xl-2 mx-auto"
                  sm="8"
                  md="6"
                  lg="8"
                >
                  <div className="my-auto">
                    <Link href="/">
                      <a className="d-flex justify-content-center">
                        <Image
                          src="/images/logo/kalbe-logo.png"
                          width={113}
                          height={51}
                        />
                      </a>
                    </Link>
                    <CardTitle
                      tag="h2"
                      className="text-center font-weight-bold mt-2 mb-4"
                    >
                      E-Logbook
                    </CardTitle>
                    <Form
                      className="auth-login-form mt-2"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setIsError(false);
                        setLoginLoading(true);
                        try {
                          if (
                            username === null ||
                            username === "" ||
                            password === null ||
                            password === ""
                          ) {
                            setLoginLoading(false);
                            return errorAlertNotification(
                              "Error",
                              "Username atau password tidak boleh kosong!"
                            );
                          }
                          const response = await signIn("credentials", {
                            callbackUrl: query.url
                              ? `/home?url=${query.url}`
                              : "/home",
                            redirect: true,
                            username,
                            password,
                            applicationCode: "HSSE",
                            getProfile: true,
                            isMobileWidth: isMobileWidth,
                          });
                          if (response.error) {
                            errorAlertNotification(
                              "Error",
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: response.error,
                                }}
                              ></div>
                            );
                          }
                        } catch (err) {
                          // console.log(err, 'di 335');
                        }
                        setLoginLoading(false);
                      }}
                    >
                      <input
                        name="csrfToken"
                        type="hidden"
                        defaultValue={csrfToken}
                      />
                      <FormGroup className="d-flex justify-content-center">
                        <Col sm="2" md="4" lg="6">
                          <Label className="form-label" for="login-email">
                            Username
                          </Label>
                          <InputUsernameIcon
                            className="input-group-merge"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="d-flex justify-content-center">
                        <Col sm="2" md="4" lg="6">
                          <Label className="form-label" for="password">
                            Password
                          </Label>
                          <InputPasswordToggle
                            className="input-group-merge"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="d-flex justify-content-center">
                        <Col sm="2" md="4" lg="6">
                          <Label className="form-label" for="password">
                            Confirm Password
                          </Label>
                          <InputPasswordToggle
                            className="input-group-merge"
                            id="password"
                            name="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          {confirmPassword !== password &&
                            confirmPassword.length > 0 && (
                              <div className="text-danger">
                                Password does not match
                              </div>
                            )}
                          <Button.Ripple
                            color="primary"
                            block
                            className="mt-2"
                            onClick={() => setDetailForm(!detailForm)}
                          >
                            Continue - ADD REGEX EMAIL
                          </Button.Ripple>
                          <div className="d-flex justify-content-center mt-1">
                            <span>
                              Already have an account?{" "}
                              <u
                                style={{ cursor: "pointer" }}
                                onClick={() => router.push("/auth")}
                              >
                                Login
                              </u>
                            </span>
                          </div>
                        </Col>
                      </FormGroup>
                    </Form>
                  </div>
                  <div className="auth-footer-btn d-flex flex-column justify-content-center align-items-center my-2">
                    <p className="m-0">
                      E-Logbook Version {metadata.appVersion}
                    </p>
                    <p className="m-0">
                      &#169;{new Date().getFullYear()} - PT. XYZ Tbk.
                    </p>
                  </div>
                </Col>
              </Col>
            </Row>
          ) : (
            <div className="min-vh-100 w-100 mx-5">
              <div className="d-flex align-items-center justify-content-center mt-5 mb-3">
                <h2>Intern Registration</h2>
              </div>

              <Card>
                <div className="px-2 py-2">
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
                        onClick={() => setDetailForm(!detailForm)}
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
                            Name <span className="text-danger">*</span>
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Full Name"
                            value={values.name}
                            onChange={handleChange("name")}
                            isRequired
                          />
                          {errors.name && (
                            <div className="text-danger">{errors.name}</div>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup tag={Col} md="12">
                          <Label className="form-label font-weight-bold">
                            Email <span className="text-danger">*</span>
                          </Label>
                          <Input
                            id="userPrincipalName"
                            type="text"
                            placeholder="Email"
                            value={values.userPrincipalName}
                            onChange={handleChange("userPrincipalName")}
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
                        <Row>
                          <Col md="3">
                            <FormGroup tag={Col} md="12">
                              <Label className="form-label font-weight-bold">
                                Education <span className="text-danger">*</span>
                              </Label>
                              <AsyncSelect
                                id="schoolName"
                                name="schoolName"
                                classNamePrefix="select"
                                cacheOptions
                                defaultOptions={EDUCATION_DATA}
                                placeholder="Select"
                                onChange={(e) => {
                                  setFieldValue("education", e.value)
                                }}
                              />
                              {errors.education && (
                                <div className="text-danger">
                                  {errors.education}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col md="9">
                            <FormGroup tag={Col} md="12">
                              <Label className="form-label font-weight-bold">
                                School/College <span className="text-danger">*</span>
                              </Label>
                              <AsyncSelect
                                id="schoolName"
                                name="schoolName"
                                classNamePrefix="select"
                                cacheOptions
                                defaultOptions={dataSchool}
                                loadOptions={loadOptionsSchool}
                                placeholder="Search"
                                onChange={(e) => {
                                  setSelectedSchool(e);
                                }}
                              />
                              {errors.schoolName && (
                                <div className="text-danger">
                                  {errors.schoolName}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                      <Col md="6">
                        <FormGroup tag={Col} md="12">
                          <Label className="form-label font-weight-bold">
                            Faculty <span className="text-danger">*</span>
                          </Label>
                          <AsyncSelect
                            id="companyCode"
                            name="companyCode"
                            classNamePrefix="select"
                            cacheOptions
                            defaultOptions={dataFaculty}
                            loadOptions={loadOptionsFaculty}
                            placeholder="Search"
                            onChange={(e) => setSelectedFaculty(e)}
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
                            Company <span className="text-danger">*</span>
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
                            defaultOptions={SITE_DATA}
                            onChange={(e) => {
                              setSelectedDepartment(e);
                            }}
                            placeholder="Search"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup tag={Col} md="12">
                          <Label className="form-label font-weight-bold">
                            Department <span className="text-danger">*</span>
                          </Label>
                          <AsyncSelect
                            id="companyCode"
                            name="companyCode"
                            classNamePrefix="select"
                            cacheOptions
                            defaultOptions={dataDepartment}
                            loadOptions={loadOptionsDepartment}
                            placeholder="Search"
                            onChange={(e) => setSelectedDepartment(e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup tag={Col} md="12">
                          <Label className="form-label font-weight-bold">
                            Mentor <span className="text-danger">*</span>
                          </Label>
                          <AsyncSelect
                            // cacheOptions
                            id="nameSearch"
                            className="dropdownModal"
                            isSearchable
                            loadOptions={loadOptionsName}
                            components={{ DropdownIndicator }}
                            getOptionValue={(option) => option.value}
                            value={selectedMentor?.name}
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
                            onChange={(e) => setSelectedMentor(e)}
                            placeholder={
                              selectedMentor?.name || "Search by name or email"
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
                                name="joinDate"
                                isRequired
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup tag={Col} md="12">
                              <FormikDatePicker
                                label="Internship End Date"
                                name="endDate"
                                isRequired
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Card>
              <div className="auth-footer-btn d-flex flex-column justify-content-center align-items-center my-3">
                <p className="m-0">E-Logbook Version {metadata.appVersion}</p>
                <p className="m-0">
                  &#169;{new Date().getFullYear()} - PT. XYZ Tbk.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { query, req, res } = ctx;

    const dataSchool = await store.dispatch(getSchoolAsyncSelect());
    const dataFaculty = await store.dispatch(getFacultyAsyncSelect());
    const dataDepartment = await store.dispatch(getDepartmentAsyncSelect());

    return {
      props: {
        csrfToken: await getCsrfToken(ctx),
        authError: query.error ? true : false,
        query: query,
        dataSchool,
        dataFaculty,
        dataDepartment,
      },
    };
  }
);

export default LoginPage;
