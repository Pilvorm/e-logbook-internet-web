import React from "react";
import { X } from "react-feather";
import { Button } from "reactstrap";

const ErrorNotification = ({
  onConfirm,
  onClose,
  title,
  description,
  isExpired,
  router,
}) => {
  return (
    <React.Fragment>
      <div
        style={{ top: -100, left: 0 }}
        className="bg-white position-absolute rounded w-100 p-0 m-0"
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
        <div className="w-100 d-flex justify-content-start py-1 px-2 bg-danger rounded">
          <span className="text-white">{title}</span>
        </div>
        <div className="d-flex justify-content-start text-left px-2 py-2">
          {description}
        </div>
        {isExpired && (
          <div className="text-left px-2">
            <span style={{ fontSize: 14 }}>Security code kedaluwarsa? </span>
            <span
              onClick={() => {
                router.push("/auth?asGuest=true");
                onClose();
              }}
              style={{ fontSize: 14, fontWeight: 700, cursor: "pointer" }}
            >
              Klik disini
            </span>
          </div>
        )}
        <div className="row p-1 d-flex justify-content-end">
          <Button.Ripple
            color="danger"
            className="btn-next mr-2"
            onClick={onConfirm}
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

export default ErrorNotification;
