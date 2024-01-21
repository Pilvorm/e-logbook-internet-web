import React from "react";
import { X } from "react-feather";
import { Button } from "reactstrap";

const SuccessNotification = ({
  onConfirm,
  onClose,
  title,
  description,
  color = "success",
}) => {
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
          onClick={onClose}
          className="bg-white rounded d-flex justify-content-center align-items-center position-absolute"
        >
          <X className="text-muted" size={18} />
        </div>
        <div
          className={`w-100 d-flex justify-content-start py-1 px-2 bg-${color} rounded`}
        >
          <span className="text-white">{title}</span>
        </div>
        <div className="d-flex justify-content-start px-2 py-2">
          {description}
        </div>
        <div className="row p-1 d-flex justify-content-end">
          <Button.Ripple
            color="success"
            className="btn-next mr-2"
            onClick={onConfirm}
          >
            <span className="align-middle d-sm-inline-block d-none">OK</span>
          </Button.Ripple>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SuccessNotification;
