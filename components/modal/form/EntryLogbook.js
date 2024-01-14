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
import moment from "moment";

const EntryLogbook = ({
  visible,
  toggle,
  data,
  sessionData,
  logbookData,
  monthQuery,
  ...props
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [dayOff, setDayOff] = useState(false);

  const validationSchema = yup
    .object({
      workType: dayOff
        ? yup.string().optional
        : yup.string().required("Work Type is required"),
      activity: yup.string().required("Activity is required"),
    })
    .required();

  const onSubmit = (values, actions) => {
    const { date, workType, activity } = values;

    // let bodyData = {
    //   name: sessionData.user.Name,
    //   upn: sessionData.user.UserPrincipalName,
    //   departmentName: sessionData.user.Dept,
    //   schoolCode: sessionData.user.SchoolCode,
    //   schoolName: sessionData.user.SchoolName,
    //   facultyCode: sessionData.user.FacultyCode,
    //   facultyName: sessionData.user.Faculty,
    //   month: monthQuery,
    //   logbookdays: [
    //     {
    //       date: date.format("YYYY-MM-DD"),
    //       workType: workType,
    //       activity,
    //     },
    //   ],
    // };

    // console.log(bodyData);

    dispatch(
      createLogbookData({
        name: sessionData.user.Name,
        upn: sessionData.user.UserPrincipalName,
        departmentName: sessionData.user.Dept,
        schoolCode: sessionData.user.SchoolCode,
        schoolName: sessionData.user.SchoolName,
        facultyCode: sessionData.user.FacultyCode,
        facultyName: sessionData.user.Faculty,
        month: monthQuery,
        logbookdays: [
          {
            date: date.format("YYYY-MM-DD"),
            workType: workType,
            activity,
          },
        ],
      })
    ).then((res) => {
      if (res.status === HTTP_CODE.OK) {
        actions.setSubmitting(false);
        successAlertNotification("Success", "Data Saved Successfully");
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
          workType: logbookData.workType ?? "",
          activity: logbookData.activity ?? "",
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
                    defaultValue={values.date.format("ddd, DD MMM YYYY")}
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
                  {/* {errors.activity && (
                    <div className="text-danger">{errors.activity}</div>
                  )} */}
                </FormGroup>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                outline={!dayOff}
                color="danger"
                id="dayOffBtn"
                name="dayOffBtn"
                onClick={() => {
                  resetForm();
                  setDayOff(!dayOff);
                }}
              >
                DAY OFF
              </Button>
              <Button
                type="submit"
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