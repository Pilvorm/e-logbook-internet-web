import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const NoValidateInput = ({ label, ...props }) => {
  return (
    <React.Fragment>
      <FormGroup className="mx-0 px-0 col-12">
        {label && <Label for={props.name}>{label}</Label>}
        <Input {...props} id={props.name} />
      </FormGroup>
    </React.Fragment>
  );
};
export default NoValidateInput;
