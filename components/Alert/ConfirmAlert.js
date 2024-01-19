import React from "react";
import { X } from "react-feather";
import { Button } from "reactstrap";

const ConfirmAlert = ({
  title,
  description,
  onConfirm,
  onClose,
  newButton,
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
        <div className="w-100 d-flex justify-content-start py-1 px-2 bg-success rounded">
          <span className="text-white">{title}</span>
        </div>
        <div className="d-flex justify-content-start px-2 py-2 text-left">
          {description}
        </div>
        <div className="row p-1 d-flex justify-content-end">
          {newButton && (
            <Button.Ripple
              id="noConfirm"
              color="success"
              className="btn-next"
              onClick={onClose}
            >
              <span className="align-middle d-sm-inline-block d-none">
                No
              </span>
            </Button.Ripple>
          )}
          <Button.Ripple
            id="yesConfirm"
            color="success"
            className="btn-next mr-2 ml-1"
            onClick={onConfirm}
          >
            <span className="align-middle d-sm-inline-block d-none">
              {newButton ? "Yes" : "OK"}
            </span>
          </Button.Ripple>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ConfirmAlert;
