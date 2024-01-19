import SelfCustomInput from "components/CustomFieldsFormik/CustomInput";
import { useFormik } from "formik";
import React, { useState } from "react";
import { X } from "react-feather";
import { Button } from "reactstrap";
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
          style={{
            height: 28,
            width: 28,
            top: -14,
            right: -14,
            cursor: "pointer",
          }}
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

        <div className="row p-1 d-flex justify-content-end">
          <Button.Ripple
            outline
            color="warning"
            className="btn-next"
            onClick={onClose}
          >
            <span className="align-middle d-sm-inline-block d-none">
              Cancel
            </span>
          </Button.Ripple>
          <Button.Ripple
            id="okConfirm"
            color="warning"
            className="btn-next ml-1 mr-2"
            onClick={() => formik.submitForm()}
          >
            <span className="align-middle d-sm-inline-block d-none">
              OK
            </span>
          </Button.Ripple>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReviseReasonSubmit;
