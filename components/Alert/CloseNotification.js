import React from "react";
import { Plus, X } from "react-feather";
import { Button } from "reactstrap";

const CloseNotification = ({
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
        <div className="row p-0 m-0 col-12 d-flex justify-content-end">
          <div className="row p-1 d-flex justify-content-end mr-1">
            <Button.Ripple color="warning" onClick={onConfirm}>
              <span className="align-middle ml-25">Yes</span>
            </Button.Ripple>
          </div>
          <div className="row p-1 d-flex justify-content-end mr-1">
            <Button.Ripple outline color="warning" onClick={onClose}>
              <span className="align-middle ml-25">No</span>
            </Button.Ripple>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CloseNotification;
