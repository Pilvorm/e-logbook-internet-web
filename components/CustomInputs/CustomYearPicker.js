import { useField } from "formik";
import React from "react";
import ReactDatePicker from "react-datepicker";
import { FormGroup, Label } from "reactstrap";

export default function MyCustomYearPicker({ isBold, label, ...props }) {
  const [field, meta, helpers] = useField(props.name);

  return (
    <React.Fragment>
      <FormGroup className="mx-0 px-0 col-12">
        {label && !isBold && (
          <Label for={props.name} style={{ fontSize: "12px" }}>
            {label}
          </Label>
        )}
        {label && isBold && (
          <Label
            for={props.name}
            style={{ fontSize: "12px" }}
            className="font-weight-bold"
          >
            {label}
          </Label>
        )}
        <ReactDatePicker
          showYearPicker
          wrapperClassName="d-block w-100"
          className="form-control datepicker-table2 w-100"
          {...field}
          {...props}
          selected={new Date(`${field.value}-01-01`)}
          dateFormat={"yyyy"}
          onChange={(val) => {
            if (val) {
              helpers.setValue(val.getFullYear());
            }
          }}
        />
      </FormGroup>
    </React.Fragment>
  );
}
