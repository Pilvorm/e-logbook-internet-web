import React, { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
  Input,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import Select from "react-select";
import { Formik } from "formik";
import AsyncSelect from "react-select/async";
import debounce from "lodash/debounce";
import { wrapper } from "redux/store";
import { getAsyncOptionsSBU } from "helpers/sbu";
import { getPermissionComponentByRoles } from "helpers/getPermission";

const STATUS_OPTIONS = [
    { value: "Waiting", label: "Waiting for Approval" },
    { value: "Signed", label: "Signed by Supervisor" },
  ];

const ModalFilterIntern = ({ visible, toggle, dataSBU, sessionData }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!dataSBU.find((data) => data.label === "All")) {
      dataSBU.unshift({ value: "", label: "All" });
    }
  }, []);

  const [selectedCompany, setSelectedCompany] = useState("");
  const isSystemAdmin = getPermissionComponentByRoles(["HSSE-SYSADMIN"]);
  const isSuperUser = getPermissionComponentByRoles(["HSSE-SU"]);

  const query = router.query ?? {};

  const loadOptionsSBU = useCallback(
    debounce((inputText, callback) => {
      if (inputText) {
        getAsyncOptionsSBU(inputText).then((options) => callback(options));
      }
    }, 1000),
    []
  );

  const getCompanyQuery = dataSBU.filter(
    (company) => company.idmCompCode === query.companyCode
  );

  const onSubmit = (values, actions) => {
    const { name, username, companyCode, email, roleName } = values;

    router.push({
      pathname: router.pathname,
      query: {
        pageSize: 10,
        pageNumber: 1,
        search: "",
        name: name ?? "",
        username: username ?? "",
        companyCode: companyCode ?? "",
        email: email ?? "",
        roleName: roleName ?? "",
      },
    });
  };

  return (
    <div className="demo-inline-spacing">
      <div>
        <Modal isOpen={visible} toggle={toggle} size="lg" centered>
          <ModalHeader className="text-secondary bg-light" toggle={toggle}>
            Filter Intern
          </ModalHeader>
          <Formik
            enableReinitialize
            initialValues={{
              name: query?.name ?? "",
              username: query?.username ?? "",
              companyCode: query?.companyCode ?? "",
              email: query?.email ?? "",
              roleName: query?.roleName ?? "",
            }}
            // validationSchema={validationSchema}
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
                <ModalBody>
                  <Row>
                    <Col sm="6">
                      <FormGroup className="custom-input-select" md="6">
                        <Label className="form-label">Nama</Label>
                        <Input
                          type="text"
                          placeholder="Name"
                          name="name"
                          value={values.name}
                          onChange={handleChange("name")}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup className="custom-input-select" md="6">
                        <Label className="form-label">Department</Label>
                        <Input
                          type="text"
                          placeholder="Username"
                          name="username"
                          value={values.username}
                          onChange={handleChange("username")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup className="custom-input-select" md="6">
                        <Label className="form-label">Company</Label>
                        <AsyncSelect
                          id="company"
                          name="companyCode"
                          classNamePrefix="select"
                          cacheOptions
                          defaultValue={
                            isSuperUser
                              ? {
                                  label: sessionData.user.CompName,
                                  value: sessionData.user.CompCode,
                                }
                              : {
                                  label:
                                    getCompanyQuery[0]?.name ?? "Search...",
                                  value: getCompanyQuery[0]?.idmCompCode,
                                }
                          }
                          defaultOptions={dataSBU}
                          loadOptions={loadOptionsSBU}
                          onChange={(e) => {
                            setFieldValue("companyCode", e.idmCompCode);
                            setSelectedCompany(e);
                          }}
                          isDisabled={isSuperUser}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup className="custom-input-select" md="6">
                        <Label className="form-label">Supervisor</Label>
                        <Input
                          type="text"
                          placeholder="Supervisor"
                          name="email"
                          value={values.email}
                          onChange={handleChange("email")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup className="custom-input-select" md="6">
                        <Label className="form-label">School/College</Label>
                        <Input
                          type="text"
                          placeholder="School/College"
                          name="roleName"
                          value={values.roleName}
                          onChange={handleChange("roleName")}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup className="custom-input-select" md="6">
                        <Label className="form-label">Faculty</Label>
                        <Input
                          type="text"
                          placeholder="Faculty"
                          name="roleName"
                          value={values.roleName}
                          onChange={handleChange("roleName")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                    <FormGroup className="custom-input-select" md="6">
                        <Label className="form-label">Status</Label>
                        <AsyncSelect
                          id="company"
                          name="status"
                          classNamePrefix="select"
                          defaultOptions={STATUS_OPTIONS}
                          loadOptions={STATUS_OPTIONS}
                          onChange={(e) => {
                            setFieldValue("companyCode", e.idmCompCode);
                            setSelectedCompany(e);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="success"
                    id="submitBtn"
                    name="submitBtn"
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner size="sm" color="white" />
                        <span className="ml-50">Submitting...</span>
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </ModalFooter>
              </>
            )}
          </Formik>
        </Modal>
      </div>
    </div>
  );
};

export default ModalFilterIntern;
