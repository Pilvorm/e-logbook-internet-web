import React from "react";
import { X } from "react-feather";

const ErrorNotificationGlobal = ({ onConfirm, onClose, title, description, isExpired, router }) => {
  return (
    <React.Fragment>
      <div
        style={{ top: -190, left: 0,}}
        className="bg-white position-absolute rounded p-0 m-auto"
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
        {
          isExpired &&
          <div className="text-left px-2">
            <span style={{fontSize: 14}} >Security code kedaluwarsa? </span>
            <span 
              onClick={() => {
                router.push("/auth?asGuest=true")
                onClose()
              }}
              style={{fontSize: 14, fontWeight: 700, cursor: 'pointer'}}
            >Klik disini</span>
          </div>
        }
        <div className="row p-1 d-flex justify-content-end">
          <div
            style={{ height: 32, cursor: "pointer" }}
            onClick={onConfirm}
            className="bg-danger px-2 rounded text-white d-flex justify-content-center align-items-center mr-2 c-button"
          >
            OK
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ErrorNotificationGlobal;
