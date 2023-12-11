import moment from "moment";
import { Fragment } from "react";
import { Calendar } from "react-feather";
import Flatpickr from "react-flatpickr";
import {
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from "reactstrap";

export default function CustomDatePicker({
  label,
  isBold,
  useUnixTimeStamp = false,
  formik,
  name,
  isArrayOfObject = false,
  mainField,
  index,
  keyObject,
  ...props
}) {
  const showError = isArrayOfObject
    ? Boolean(
        formik.touched[mainField] &&
          formik.errors[mainField] &&
          formik.errors[mainField][index] &&
          formik.errors[mainField][index][keyObject]
      )
    : Boolean(formik.touched[name] && formik.errors[name]);

  return (
    <Fragment>
      <FormGroup className="mx-0 px-0 col-12">
        {label && !isBold && (
          <Label
            for={props.name}
            style={{ fontSize: "12px" }}
            className="font-weight-bold"
          >
            {label}
          </Label>
        )}
        {label && isBold && (
          <span
            className="font-weight-bold"
            htmlFor={props.name}
            style={{ fontSize: "12px" }}
          >
            {label}
          </span>
        )}
        <Flatpickr
          {...props}
          id={props.name}
          options={{
            dateFormat: "d M Y",
          }}
          value={
            isArrayOfObject
              ? useUnixTimeStamp
                ? moment
                    .unix(formik.values[mainField][index][keyObject])
                    .toDate()
                : moment(formik.values[mainField][index][keyObject]).toDate()
              : moment(formik.values[name]).toDate()
          }
          onChange={([date]) => {
            if (useUnixTimeStamp) {
              formik.setFieldValue(name, moment(date).unix());
              return;
            }
            formik.setFieldValue(name, moment(date).format("YYYY-MM-DD"));
          }}
          render={({ defaultValue, value, ...props }, ref) => {
            return (
              <InputGroup className="input-group-merge">
                <Input {...props} innerRef={ref} invalid={showError} />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Calendar size={15} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            );
          }}
        />
        {showError && (
          <div className="text-danger" style={{ fontSize: "12px" }}>
            {isArrayOfObject
              ? formik.errors[mainField][index][keyObject]
              : formik.errors[name]}
          </div>
        )}
      </FormGroup>
    </Fragment>
  );
}
