// import { useField } from "formik";
// import moment from "moment";
// import { Fragment } from "react";
// import { Calendar } from "react-feather";
// import Flatpickr from "react-flatpickr";
// import {
//   FormGroup,
//   Input,
//   InputGroup,
//   InputGroupAddon,
//   InputGroupText,
//   Label,
// } from "reactstrap";

// export default function CustomDatePicker({ label, isBold, ...props }) {
//   const [field, meta, helpers] = useField(props);

//   const showError = Boolean(meta.touched && meta.error);

//   return (
//     <Fragment>
//       <FormGroup className="mx-0 px-0 col-12">
//         {label && !isBold && (
//           <Label
//             for={props.name}
//             style={{ fontSize: "12px" }}
//             className="font-weight-bold"
//           >
//             {label}
//           </Label>
//         )}
//         {label && isBold && (
//           <span
//             className="font-weight-bold"
//             htmlFor={props.name}
//             style={{ fontSize: "12px" }}
//           >
//             {label}
//           </span>
//         )}
//         <Flatpickr
//           id={props.name}
//           options={{
//             dateFormat: "d M Y",
//           }}
//           value={moment(field.value).toDate()}
//           onChange={([date]) => {
//             helpers.setValue(moment(date).format("YYYY-MM-DD"));
//           }}
//           render={({ defaultValue, value, ...props }, ref) => {
//             return (
//               <InputGroup className="input-group-merge">
//                 <Input {...props} innerRef={ref} />
//                 <InputGroupAddon addonType="append">
//                   <InputGroupText>
//                     <Calendar size={15} />
//                   </InputGroupText>
//                 </InputGroupAddon>
//               </InputGroup>
//             );
//           }}
//         />
//       </FormGroup>
//     </Fragment>
//   );
// }

import { useField } from "formik";
import moment from "moment";
import { Fragment } from "react";
import { Calendar } from "react-feather";
import Flatpickr from "react-flatpickr";
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from "reactstrap";

const Wrapper = ({ children, withFormGroup }) => {
  return (
    <Fragment>
      {withFormGroup ? (
        <FormGroup className="mx-0 px-0 col-12">{children}</FormGroup>
      ) : (
        <Fragment>{children}</Fragment>
      )}
    </Fragment>
  );
};

export default function CustomDatePicker({
  label,
  isBold,
  disabled,
  readOnly,
  withFormGroup = true,
  ...props
}) {
  const [field, meta, helpers] = useField(props);

  const showError = Boolean(meta.touched && meta.error);

  return (
    <Fragment>
      <Wrapper withFormGroup={withFormGroup}>
        {label && !isBold && (
          <Label
            for={props.name}
            style={{ fontSize: "12px" }}
            className="font-weight-bold"
          >
            {label} {props.isRequired && <span className="text-danger">*</span>}
          </Label>
        )}
        {label && isBold && (
          <span
            className="font-weight-bold"
            htmlFor={props.name}
            style={{ fontSize: "12px" }}
          >
            {label} {props.isRequired && <span className="text-danger">*</span>}
          </span>
        )}
        <Flatpickr
          id={props.name}
          options={{
            dateFormat: "d M Y",
          }}
          value={moment(field.value).toDate()}
          onChange={([date]) => {
            helpers.setValue(moment(date).format("YYYY-MM-DD"));
          }}
          render={({ defaultValue, value, ...props }, ref) => {
            return (
              <InputGroup className="input-group-merge">
                <Input
                  {...props}
                  innerRef={ref}
                  disabled={disabled} // Add the disabled prop to make the input disabled
                  readOnly={readOnly} // Add the readOnly prop to make the input read-only
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Calendar size={15} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            );
          }}
        />
      </Wrapper>
    </Fragment>
  );
}
