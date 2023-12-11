import SelfCustomInput from "components/CustomFieldsFormik/CustomInput";
import { useFormik } from "formik";
import React, { useState } from "react";
import { X } from "react-feather";
import { FormFeedback } from "reactstrap";
import * as yup from "yup";
const ReviseReasonSubmit = ({ title, description, onClose, onConfirm }) => {
  const formik = useFormik({
    initialValues: {
      notes: "",
    },
    validationSchema: yup.object().shape({
      notes: yup.string().required("Harus diisi"),
    }),
    onSubmit: async (values) => {
      onConfirm(values.notes);
    },
  });

  return (
    <React.Fragment>
      <div
        style={{ top: -100 }}
        className="bg-white position-absolute rounded col-10 col-md-12 p-0 m-0"
      >
        <div
          style={{ height: 28, width: 28, top: -14, right: -14 }}
          className="bg-white rounded d-flex justify-content-center align-items-center position-absolute"
          onClick={onClose}
        >
          <X className="text-muted" size={18} />
        </div>
        <div className="w-100 d-flex justify-content-start py-1 px-2 bg-warning rounded">
          <span className="text-white">{title ?? "Revise"}</span>
        </div>
        <div className="d-flex justify-content-start px-2 py-1">Reason</div>
        <div className="px-2">
          <SelfCustomInput type="textarea" name={"notes"} formik={formik} />
        </div>
        <br />

        <div className="row p-1 d-flex justify-content-between">
          <div
            id="okConfirm"
            style={{ height: 32, cursor: "pointer" }}
            className="bg-warning px-2 rounded text-white d-flex justify-content-center align-items-center ml-2 cursor-pointer"
            onClick={() => formik.submitForm()}
          >
            OK
          </div>
          <div
            style={{ height: 32, cursor: "pointer" }}
            className="bg-white text-warning px-2 rounded text-white d-flex justify-content-center align-items-center mr-2 border border-warning cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReviseReasonSubmit;
