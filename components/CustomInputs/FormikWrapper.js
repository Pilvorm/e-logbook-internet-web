import React, { useRef } from "react";
import { Formik } from "formik";

function FormikWrapper(props) {
  const {
    innerRef,
    initialValues = {},
    validationSchema = {},
    onSubmit,
  } = props;
  const formikRef = innerRef ?? useRef();
  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        onSubmit(values, actions);
      }}
    >
      {props.children}
    </Formik>
  );
}

export default FormikWrapper;
