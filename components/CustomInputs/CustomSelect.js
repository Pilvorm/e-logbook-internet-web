import { useField } from "formik";
import React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

const MyCustomSelect = ({
  label,
  smallLabel,
  options = [],
  placeholder = "Select...",
  ...props
}) => {
  const [field, meta] = useField(props);

  const showError = Boolean(meta.touched && meta.error);

  return (
    <React.Fragment key={Math.floor(Math.random() * 100000).toString()}>
      <FormGroup className="mx-0 px-0 col-12">
        {label && (
          <Label
            className="font-weight-bold"
            for={props.name}
            style={{ fontSize: "12px" }}
          >
            {label}
          </Label>
        )}
        <Input
          invalid={showError}
          type="select"
          {...field}
          {...props}
          id={props.name}
        >
          <option hidden>{placeholder}</option>
          {options.map((item) => {
            return (
              <option
                value={item.value}
                key={Math.floor(Math.random() * 100000).toString()}
              >
                {item.label}
              </option>
            );
          })}
        </Input>
        {smallLabel && (
          <Label
            className=""
            for={props.name}
            style={{ fontSize: "10px" }}
          >
            {smallLabel}
          </Label>
        )}
        {showError && <FormFeedback>{meta.error}</FormFeedback>}
      </FormGroup>
    </React.Fragment>
  );
};
export default MyCustomSelect;
