import { useField } from "formik";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import Select from "react-select";

const MyCustomReactSelect = ({
  onChangeValue,
  loadOptionsChange,
  removeGap,
  formikRef,
  label,
  initial,
  isBold,
  options,
  height = null,
  ...props
}) => {
  const [field, meta] = useField(props);
  const inputRef = useRef();
  const [value, setValue] = useState({
    label: "Ketik untuk mencari...",
    value: "",
  });
  useEffect(() => {
    if (initial) {
      setValue({
        label: initial,
        value: initial,
      });
    }
    return () => {};
  }, [initial]);

  const [touched, setTouched] = useState(false);

  const onChangeinput = () => {
    inputRef.current.value = value?.value ?? "";
  };

  useEffect(() => {
    onChangeinput();
    return () => {};
  }, [value]);

  let showError =
    (touched && (meta?.error ?? "").length > 0) ||
    (meta.touched && (meta?.error ?? "").length > 0);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      boxShadow: "none",
      border: showError ? "1px solid red" : "",
      "&:hover": { borderColor: showError ? "red" : "" },
    }),
    menuList: (base) => ({
      ...base,
      height: height,
    }),
  };

  return (
    <Fragment>
      <FormGroup className={`${removeGap ? "m-0 p-0" : "mx-0 px-0"} col-12`}>
        {label && !isBold && <Label for={props.name}>{label}</Label>}
        {label && isBold && (
          <span className="font-weight-bold" for={props.name}>
            {label}
          </span>
        )}
        <Select
          id={props.name}
          instanceId={"MyCustomReactSelect"}
          name={props.name}
          placeholder="Placeholder"
          options={options}
          className="mx-0 px-0 col-12"
          classNamePrefix="select"
          loadingMessage={() => <p className="m-0">Loading..</p>}
          isClearable
          {...field}
          {...props}
          onChange={(value) => {
            setTouched(false);
            onChangeValue(value);
            setValue(value);
          }}
          onBlur={() => {
            setTouched(false);
          }}
          onFocus={() => {
            setTouched(true);
          }}
          value={value}
          styles={customStyles}
        />
        <Input
          id={props.name}
          invalid={showError}
          type="text"
          ref={inputRef}
          {...field}
          {...props}
          value={value?.value ?? ""}
          hidden
        />
        {showError && <FormFeedback>{meta.error}</FormFeedback>}
      </FormGroup>
    </Fragment>
  );
};

export default MyCustomReactSelect;
