import {
  errorAlertNotification,
  successAlertNotification,
} from "components/notification";
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
import * as yup from "yup";
import FormikInput from "components/CustomInputs/CustomInput";
import CustomRadio from "components/CustomInputs/CustomRadio";

const validationSchema = yup
  .object({
    wfhAllowanceFee: yup.number().min(1, "Must be greather than 0").required(),
    wfoAllowanceFee: yup.number().min(1, "Must be greather than 0").required(),
  })
  .required();

const EntryLogbook = ({ visible, toggle, data, ...props }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  //   const onSubmit = (values, actions) => {
  //     const { educationCode, educationName, wfhAllowanceFee, wfoAllowanceFee } =
  //       values;

  //     dispatch(
  //       editAllowance(data.id, {
  //         ...data,
  //         id: data.id,
  //         allowances: [
  //           {
  //             ...data.allowances[0],
  //             id: data.allowances[0].id,
  //             workType: "WFH",
  //             allowanceFee: wfhAllowanceFee,
  //           },
  //           {
  //             ...data.allowances[1],
  //             id: data.allowances[1].id,
  //             workType: "WFO",
  //             allowanceFee: wfoAllowanceFee,
  //           },
  //         ],
  //       })
  //     ).then((res) => {
  //       if (res.status === HTTP_CODE.OK) {
  //         actions.setSubmitting(false);
  //         successAlertNotification("Success", "Data Updated Successfully");
  //         router.push({
  //           pathname: router.pathname,
  //         });
  //       } else if (res.status === 409) {
  //         actions.setSubmitting(false);
  //         errorAlertNotification(
  //           "Duplicate",
  //           "Duplicate Data, Please check your data."
  //         );
  //       } else {
  //         actions.setSubmitting(false);
  //         console.error(res);
  //         let errorMessages = [];

  //         try {
  //           errorMessages = Object.entries(res.data.errors).flatMap(
  //             ([field, messages]) => {
  //               return messages.map((message) => ({ field, message }));
  //             }
  //           );
  //         } catch (error) {
  //           // Handle the error appropriately
  //           errorMessages = [
  //             {
  //               field: "Error",
  //               message: "Something went wrong, Please try again later.",
  //             },
  //           ];
  //         }

  //         const title = "Error";
  //         const message =
  //           errorMessages.length > 0
  //             ? errorMessages
  //                 .map(({ field, message }) => `${field}: ${message}`)
  //                 .join("\n")
  //             : "";

  //         errorAlertNotification(title, message);
  //       }
  //     });
  //   };

  return (
    <Modal isOpen={visible} toggle={toggle} size="lg">
      <ModalHeader className="text-secondary bg-light" toggle={toggle}>
        Entry Logbook
      </ModalHeader>
      <Formik
        initialValues={
          {
            //   educationCode: data?.educationCode ?? "",
            //   educationName: data?.educationName ?? "",
            //   wfhAllowanceFee: data?.allowances[0].allowanceFee ?? "",
            //   wfoAllowanceFee: data?.allowances[1].allowanceFee ?? "",
          }
        }
        validationSchema={validationSchema}
        // onSubmit={onSubmit}
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
              <form>
                <FormGroup>
                  <Label className="form-label">Date</Label>
                  <Input
                    id="education"
                    type="text"
                    placeholder="Date"
                    defaultValue={props.date}
                    onChange={handleChange("education")}
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
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="form-label">Activity</Label>
                  <FormikInput
                    type="textarea"
                    name="aktivitasKorban"
                    placeholder=""
                    customInlineStyle={{
                      resize: "none",
                      height: "150px",
                    }}
                  />
                </FormGroup>
              </form>
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
  );
};

export default EntryLogbook;
