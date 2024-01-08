import {
  errorAlertNotification,
  successAlertNotification,
} from "components/notification";
import { useEffect, useState } from "react";
import { HTTP_CODE } from "constant";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { editAllowance } from "redux/actions/master/allowance";
import { createLogbookData } from "redux/actions/logbook";
import * as yup from "yup";
import FormikInput from "components/CustomInputs/CustomInput";
import CustomRadio from "components/CustomInputs/CustomRadio";

const validationSchema = yup
  .object({
    wfhAllowanceFee: yup.number().min(1, "Must be greather than 0").required(),
    wfoAllowanceFee: yup.number().min(1, "Must be greather than 0").required(),
  })
  .required();

const EntryLogbook = ({ visible, toggle, data, sessionData, logbookData, monthQuery, ...props }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [dayOff, setDayOff] = useState(false);

  const onSubmit = (values, actions) => {
    const { date, workType, activity } = values;

    dispatch(
      createLogbookData({
        name: sessionData.user.name,
        upn: sessionData.user.UserPrincipalName,
        departmentName: sessionData.user.dept,
        schoolCode: sessionData.user.schoolCode,
        schoolName: sessionData.user.schoolName,
        facultyCode: sessionData.user.facultyCode,
        facultyName: sessionData.user.faculty,
        month: monthQuery,
        logbookdays:[
          date,
          workType,
          activity
        ]
      })
    ).then((res) => {
      if (res.status === HTTP_CODE.OK) {
        actions.setSubmitting(false);
        successAlertNotification("Success", "Data Updated Successfully");
        router.push({
          pathname: router.pathname,
        });
      } else {
        actions.setSubmitting(false);
        console.error(res);
        let errorMessages = [];

        try {
          errorMessages = Object.entries(res.data.errors).flatMap(
            ([field, messages]) => {
              return messages.map((message) => ({ field, message }));
            }
          );
        } catch (error) {
          // Handle the error appropriately
          errorMessages = [
            {
              field: "Error",
              message: "Something went wrong, Please try again later.",
            },
          ];
        }

        const title = "Error";
        const message =
          errorMessages.length > 0
            ? errorMessages
                .map(({ field, message }) => `${field}: ${message}`)
                .join("\n")
            : "";

        errorAlertNotification(title, message);
      }
    });
  };

  return (
    <Modal isOpen={visible} toggle={toggle} size="lg">
      <ModalHeader className="text-secondary bg-light" toggle={toggle}>
        Entry Logbook
      </ModalHeader>
      <Formik
        initialValues={{
          date: props.date ?? "",
          workType: "",
          activity: "",
        }}
        validationSchema={validationSchema}
        // onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          setFieldValue,
          handleSubmit,
          handleChange,
          resetForm,
          isSubmitting,
        }) => (
          <>
            <ModalBody>
              <form>
                <FormGroup>
                  <Label className="form-label">Date</Label>
                  <Input
                    id="education"
                    name="date"
                    type="text"
                    placeholder="Date"
                    defaultValue={values.date}
                    onChange={handleChange("date")}
                    disabled
                  />
                </FormGroup>
                <FormGroup className="my-2">
                  <CustomRadio
                    label="WFH/WFO"
                    name="workType"
                    options={[
                      {
                        value: "WFH",
                        label: "WFH",
                        key: "workType-wfh",
                      },
                      {
                        value: "WFO",
                        label: "WFO",
                        key: "workType-wfo",
                      },
                    ]}
                    isRow={true}
                    disabledForm={dayOff}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="form-label">Activity</Label>
                  <FormikInput
                    type="textarea"
                    name="activity"
                    placeholder={dayOff ? "OFF" : ""}
                    customInlineStyle={{
                      resize: "none",
                      height: "150px",
                    }}
                    value={values.activity}
                    disabled={dayOff}
                  />
                </FormGroup>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                outline={!dayOff}
                color="danger"
                id="submitBtn"
                name="submitBtn"
                onClick={() => {
                  resetForm();
                  setDayOff(!dayOff);
                }}
              >
                DAY OFF
              </Button>
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
  );
};

export default EntryLogbook;
