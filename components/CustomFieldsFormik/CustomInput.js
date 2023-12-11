import React, { useEffect, useState } from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

const SelfCustomInput = ({
  label,
  isBold,
  isRequired,
  isArrayOfObject = false,
  name,
  height,
  formik,
  append,
  prepend,
  mainField,
  index,
  keyObject,
  ...props
}) => {
  const showError = isArrayOfObject
    ? Boolean(
        formik.touched[mainField] &&
          formik.errors[mainField] &&
          formik.errors[mainField][index] &&
          formik.errors[mainField][index][keyObject]
      )
    : Boolean(formik.touched[name] && formik.errors[name]);

  return (
    <React.Fragment>
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
        {isRequired && <span style={{ color: "red" }}> *</span>}
        <div className="d-flex justify-content-between align-items-center pl-0">
          {prepend && (
            <div className="mr-2">
              <p className="text-center align-middle my-auto">{prepend}</p>
            </div>
          )}
          {height && (
            <Input
              {...props}
              value={
                isArrayOfObject
                  ? formik.values[mainField][index][keyObject]
                  : formik.values[name]
              }
              name={name}
              invalid={showError}
              id={props.name}
              style={{ height: height }}
              onChange={formik.handleChange}
            />
          )}
          {!height && (
            <Input
              {...props}
              name={name}
              value={
                isArrayOfObject
                  ? formik.values[mainField][index][keyObject]
                  : formik.values[name]
              }
              invalid={showError}
              id={props.name}
              onChange={formik.handleChange}
            />
          )}
          {append && (
            <div className="mr-2">
              <p className="text-center align-middle my-auto">{append}</p>
            </div>
          )}
        </div>
        {showError && (
          <div className="text-danger" style={{ fontSize: "12px" }}>
            {/* {formik.errors[name]} */}
            {isArrayOfObject
              ? formik.errors[mainField][index][keyObject]
              : formik.errors[name]}
          </div>
        )}
      </FormGroup>
    </React.Fragment>
  );
};
export default SelfCustomInput;
