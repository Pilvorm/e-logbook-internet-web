import { useField } from "formik";
import { Fragment } from "react";
import AsyncSelect from "react-select/async";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

export default function CustomAsyncSelect2({ label, ...props }) {
  const [_, meta, helpers] = useField(props);

  const showError = meta.touched && meta.error;

  const customStyles = {
    control: (base, state) => ({
      ...base,
      boxShadow: "none",
      border: showError ? "1px solid red" : "",
      "&:hover": { borderColor: showError ? "red" : "" },
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  return (
    <Fragment>
      <FormGroup className="mx-0 px-0 col-12">
        {label && (
          <Label
            htmlFor={props.name}
            className="font-weight-bold"
            style={{ fontSize: "12px" }}
          >
            {label}
          </Label>
        )}
        <AsyncSelect
          id={props.name}
          instanceId="MyCustomAsyncSelect2"
          cacheOptions
          isClearable
          menuPortalTarget={document.body}
          {...props}
          value={
            props.value?.label
              ? {
                  label: props.value.label,
                  value: props.value.value,
                }
              : {
                  label: "Pilih...",
                  value: "",
                }
          }
          onChange={(option) => {
            helpers.setTouched(false);
            props.onChange(option);
          }}
          onBlur={helpers.setTouched}
          className="mx-0 px-0 col-12"
          styles={customStyles}
        />

        <Input id={props.name} type="text" invalid={showError} hidden />
        {showError && <FormFeedback>{meta.error}</FormFeedback>}
      </FormGroup>
    </Fragment>
  );
}
