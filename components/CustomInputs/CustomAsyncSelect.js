import { useField } from "formik";
import React, { Fragment, useEffect, useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

const MyCustomAsyncSelect = ({
  onChangeValue,
  loadOptionsChange,
  removeGap,
  formikRef,
  isBold = false,
  label,
  initial,
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

  const loadOptions = async (inputValue) => {
    const listOptions = await loadOptionsChange(inputValue);
    return listOptions;
  };

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
      // You can also use state.isFocused to conditionally style based on the focus state
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
        <AsyncSelect
          id={props.name}
          placeholder="Ketik untuk mencari..."
          instanceId={"MyCustomAsyncSelect"}
          loadOptions={loadOptions}
          defaultOptions
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
          className="mx-0 px-0 col-12"
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

export default MyCustomAsyncSelect;
