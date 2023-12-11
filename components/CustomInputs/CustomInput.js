// import { useField } from "formik";
// import React from "react";
// import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

// const SelfCustomInput = ({ label, isBold, isRequired, height, ...props }) => {
//   const [field, meta] = useField(props);

//   const showError = Boolean(meta.touched && meta.error);

//   return (
//     <React.Fragment>
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
//         {isRequired && <span style={{ color: "red" }}> *</span>}
//         {height && (
//           <Input
//             invalid={showError}
//             {...field}
//             {...props}
//             id={props.name}
//             style={{ height: height }}
//           />
//         )}
//         {!height && (
//           <Input invalid={showError} {...field} {...props} id={props.name} />
//         )}
//         {showError && <FormFeedback>{meta.error}</FormFeedback>}
//       </FormGroup>
//     </React.Fragment>
//   );
// };
// export default SelfCustomInput;
import { useField } from "formik";
import React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

const SelfCustomInput = ({
  label,
  isBold,
  isRequired,
  height,
  width,
  textCenter,
  customInlineStyle,
  ...props
}) => {
  const [field, meta] = useField(props);

  const showError = Boolean(meta.touched && meta.error);

  const inputStyle = {
    width: width,
    textAlign: textCenter ? "center" : "left", // Set text alignment to center if textCenter prop is true
  };

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
        {height && (
          <Input
            invalid={showError}
            {...field}
            {...props}
            id={props.name}
            style={{ ...inputStyle, height: height, ...customInlineStyle }}
          />
        )}
        {!height && (
          <Input
            invalid={showError}
            {...field}
            {...props}
            id={props.name}
            style={{ ...inputStyle, ...customInlineStyle }}
          />
        )}
        {showError && <FormFeedback>{meta.error}</FormFeedback>}
      </FormGroup>
    </React.Fragment>
  );
};

export default SelfCustomInput;
