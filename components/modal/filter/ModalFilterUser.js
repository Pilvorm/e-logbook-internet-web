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

import { wrapper } from "redux/store";
import debounce from "lodash/debounce";

import { Formik } from "formik";
import AsyncSelect from "react-select/async";

import { searchCompany, getAsyncOptionsSBU } from "helpers/sbu";
import { getPermissionComponentByRoles } from "helpers/getPermission";

const ModalFilterUser = ({
  visible,
  toggle,
  sessionData,
  handleFilterQuery,
  filterQuery,
  setFilterQuery,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isSystemAdmin = getPermissionComponentByRoles(["HSSE-SYSADMIN"]);
  const isSuperUser = getPermissionComponentByRoles(["HSSE-SU"]);

  const query = router.query ?? {};

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

  const loadOptionsSBU = useCallback(
    debounce((inputText, callback) => {
      if (inputText) {
        getAsyncOptionsSBU(inputText).then((options) => callback(options));
      }
    }, 1000),
    []
  );

  const [selectedCompany, setSelectedCompany] = useState({
    label: "Search...",
    value: "",
  });

  console.log("COMPANY");
  console.log(selectedCompany);

  return (
    <div className="demo-inline-spacing">
      <div>
        <Modal isOpen={visible} toggle={toggle} size="lg" centered>
          <ModalHeader className="text-secondary bg-light" toggle={toggle}>
            Filter User
          </ModalHeader>
          <Formik enableReinitialize>
            {({
              values,
              errors,
              setFieldValue,
              handleSubmit,
              handleChange,
              setSubmitting,
              isSubmitting,
              resetForm,
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
                          value={filterQuery.name}
                          onChange={(e) => {
                            setFilterQuery({
                              ...filterQuery,
                              name: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup className="custom-input-select" md="6">
                        <Label className="form-label">
                          User Principal Name
                        </Label>
                        <Input
                          type="text"
                          placeholder="User Principal Name"
                          name="userPrincipalName"
                          value={filterQuery.userPrincipalName}
                          onChange={(e) => {
                            setFilterQuery({
                              ...filterQuery,
                              userPrincipalName: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup className="custom-input-select" md="6">
                        <Label className="form-label">Company</Label>
                        <AsyncSelect
                          id="companyCode"
                          name="companyCode"
                          classNamePrefix="select"
                          cacheOptions
                          value={{
                            label: selectedCompany.label,
                            value: selectedCompany.value,
                          }}
                          // defaultOptions={dataSBU}
                          loadOptions={loadOptionsCompany}
                          onChange={(e) => {
                            console.log(e);
                            setSelectedCompany(e);
                            if (e) {
                              setFilterQuery({
                                ...filterQuery,
                                compName: e.compName,
                              });
                            } else {
                              setFilterQuery({
                                ...filterQuery,
                                compName: "",
                              });
                            }
                          }}
                          placeholder="Search..."
                          isDisabled={isSuperUser}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup className="custom-input-select" md="6">
                        <Label className="form-label">Email</Label>
                        <Input
                          type="text"
                          placeholder="Email"
                          name="email"
                          value={filterQuery.email}
                          onChange={(e) => {
                            setFilterQuery({
                              ...filterQuery,
                              email: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup className="custom-input-select" md="6">
                        <Label className="form-label">Role</Label>
                        <Input
                          type="text"
                          placeholder="Role Name"
                          name="roleName"
                          value={filterQuery.roleName}
                          onChange={(e) => {
                            setFilterQuery({
                              ...filterQuery,
                              roleName: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </ModalBody>
                <ModalFooter>
                  <div className="d-flex justify-content-between w-100">
                    <Button
                      color="danger"
                      id="submitBtn"
                      name="submitBtn"
                      outline
                      onClick={() => {
                        resetForm();
                        setSelectedCompany({
                          label: "Search...",
                          value: "",
                        });
                        setFilterQuery({
                          name: "",
                          userPrincipalName: "",
                          compName: "",
                          email: "",
                          roleName: "",
                        });
                      }}
                    >
                      Clear
                    </Button>
                    <Button
                      color="success"
                      id="submitBtn"
                      name="submitBtn"
                      onClick={() => {
                        handleFilterQuery(filterQuery);
                        setSubmitting(true);
                      }}
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
                  </div>
                </ModalFooter>
              </>
            )}
          </Formik>
        </Modal>
      </div>
    </div>
  );
};

export default ModalFilterUser;
