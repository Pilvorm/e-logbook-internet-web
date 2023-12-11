import React from "react";
import { X } from "react-feather";

const ErrorNotificationCode = ({ onConfirm, onClose, title, description, isExpired, router }) => {
  return (
    <React.Fragment>
      <div
        style={{ top: -100, left: 0 }}
        className="bg-white position-absolute rounded p-0 m-0"
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
          <p>
            Security code yang anda masukkan tidak benar. 
            Silakan <span onClick={onConfirm} style={{color: '#46a583', fontWeight: 800, textDecoration: 'underline', cursor: 'pointer' }}>klik di sini</span> untuk resend security code. 

            terima kasih.
          </p>
        </div>
        <div className="row p-1 d-flex justify-content-end">
          <div
            style={{ height: 32, cursor: "pointer" }}
            onClick={onClose}
            className="bg-danger px-2 rounded text-white d-flex justify-content-center align-items-center mr-2 c-button"
          >
            OK
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ErrorNotificationCode;
