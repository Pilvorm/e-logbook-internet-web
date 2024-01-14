import { useState } from "react";
import {
  Button,
  CustomInput,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const StatusModal = ({ visible, toggle, status }) => {
  function formatApprovalString(inputString) {
    if (
      inputString.includes("Waiting for") &&
      inputString.includes("approval")
    ) {
      const trimmedString = inputString
        .replace("Waiting for ", "")
        .replace("’s approval", "");

      // Split the remaining string by '/'
      const names = trimmedString.split("/");

      // Create a new HTML string with line break elements
      const formattedString = `Waiting for approval:<br>${names
        .map((name) => `- ${name.trim()}`)
        .join("<br>")}`;

      return formattedString;
    }

    return inputString;
    // Remove "Waiting for" and "’s approval" parts
  }

  const formattedStatus = formatApprovalString(status);

  return (
    <Modal
      isOpen={visible}
      toggle={toggle}
      backdrop={"static"}
      size="sm"
      centered={true}
    >
      <ModalHeader
        className="modalHeaderTextRejectPopUp bg-warning"
        // style={{ backgroundColor: "#3B85F8" }}
        toggle={toggle}
      >
        Status
      </ModalHeader>
      <ModalBody>
        <div
          className="w-100 d-flex justify-content-start"
          dangerouslySetInnerHTML={{ __html: formattedStatus }}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" outline onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default StatusModal;
