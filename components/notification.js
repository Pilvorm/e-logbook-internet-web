import ConfirmAlert from "components/Alert/ConfirmAlert";
import ErrorNotification from "components/Alert/ErrorNotification";
import RejectReasonSubmit from "components/Alert/RejectReasonSubmit";
import ReviseReasonSubmit from "components/Alert/ReviseReasonSubmit";
import SuccessNotification from "components/Alert/SuccessNotification";
import { signOut } from "next-auth/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ErrorNotificationCode from "./Alert/ErrorNotificationCode";
import ErrorNotificationGlobal from "./Alert/ErrorNotificationGlobal";
import ReviseWithFormik from "./Alert/ReviseWithFormik";

const MySwal = withReactContent(Swal);

export const reviseAlertNotification = (title, btnName, customFunction) => {
  return MySwal.fire({
    position: "center",
    html: (
      <ReviseReasonSubmit
        title={title}
        buttonName={btnName}
        onConfirm={(noteRevise) => {
          if (noteRevise.length == 0) {
            alert("Alasan harus diisi");
          } else {
            console.log(noteRevise);
            MySwal.close();
          }
          // customFunction(noteRevise);
        }}
        onClose={() => {
          MySwal.close();
        }}
      />
    ),
    showDenyButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    padding: "0",
    allowOutsideClick: false,
  });
};
export const reviseWithValidation = (title, btnName, customFunction) => {
  return MySwal.fire({
    position: "center",
    html: (
      <ReviseWithFormik
        title={title}
        buttonName={btnName}
        onConfirm={(noteRevise) => {
          customFunction(noteRevise);
        }}
        onClose={() => {
          MySwal.close();
        }}
      />
    ),
    showDenyButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    padding: "0",
    allowOutsideClick: false,
  });
};

export const rejectAlertNotification = (title, btnName) => {
  return MySwal.fire({
    position: "center",
    html: (
      <RejectReasonSubmit
        title={title}
        buttonName={btnName}
        onConfirm={(noteRevise) => {
          MySwal.close();
        }}
        onClose={() => {
          MySwal.close();
        }}
      />
    ),
    showDenyButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    padding: "0",
    allowOutsideClick: false,
  });
};

export const errorAlertNotification = (title, message, isExpired, router) => {
  return MySwal.fire({
    position: "center",
    html: (
      <ErrorNotification
        title={title}
        description={message}
        onClose={() => MySwal.close()}
        onConfirm={() => MySwal.close()}
        isExpired={isExpired}
        router={router}
      />
    ),
    showDenyButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    padding: "0",
    allowOutsideClick: false,
  });
};

export const errorAlertNotificationCode = (title, message, onConfirm) => {
  return MySwal.fire({
    position: "center",
    html: (
      <ErrorNotificationCode
        title={title}
        description={message}
        onClose={() => MySwal.close()}
        onConfirm={onConfirm}
      />
    ),
    showDenyButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    padding: "0",
    allowOutsideClick: false,
  });
};

export const errorAlertNotificationGlobal = (title, message) => {
  return MySwal.fire({
    position: "center",
    html: (
      <ErrorNotificationGlobal
        title={title}
        description={message}
        onClose={() => MySwal.close()}
        onConfirm={() => MySwal.close()}
      />
    ),
    showDenyButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    padding: "0",
    allowOutsideClick: false,
  });
};

export const errorSignOutNotification = (title, message) => {
  return MySwal.fire({
    position: "center",
    html: (
      <ErrorNotification
        title={title}
        description={message}
        onClose={() => signOut()}
        onConfirm={() => signOut()}
      />
    ),
    showDenyButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    padding: "0",
    allowOutsideClick: false,
  });
};

export const successAlertNotification = (title, message) => {
  return MySwal.fire({
    position: "center",
    html: (
      <SuccessNotification
        onClose={() => MySwal.close()}
        onConfirm={() => MySwal.close()}
        title={title}
        description={message}
      />
    ),
    showDenyButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    padding: "0",
    allowOutsideClick: false,
  });
};

export const successAlertNotificationWithFunction = (
  title,
  message,
  customFunc
) => {
  return MySwal.fire({
    position: "center",
    html: (
      <SuccessNotification
        onClose={() => {
          MySwal.close();
          customFunc();
        }}
        onConfirm={() => {
          MySwal.close();
          customFunc();
        }}
        title={title}
        description={message}
      />
    ),
    showDenyButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    padding: "0",
    allowOutsideClick: false,
  });
};

export const confirmAlertNotification = (
  title,
  message,
  onConfirm,
  onClose
) => {
  MySwal.close();
  return MySwal.fire({
    position: "center",
    html: (
      <ConfirmAlert
        newButton={true}
        onClose={() => {
          MySwal.close();
          onClose();
        }}
        onConfirm={async () => {
          MySwal.close();
          onConfirm();
        }}
        title={title}
        description={message}
      />
    ),
    showDenyButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    padding: "0",
    allowOutsideClick: false,
  });
};

export const confirmAlertNotificationSimple = (title, message, onConfirm) => {
  MySwal.close();
  return MySwal.fire({
    position: "center",
    html: (
      <ConfirmAlert
        newButton={true}
        onClose={() => {
          MySwal.close();
        }}
        onConfirm={async () => {
          MySwal.close();
          onConfirm();
        }}
        title={title}
        description={message}
      />
    ),
    showDenyButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    padding: "0",
    allowOutsideClick: false,
  });
};
