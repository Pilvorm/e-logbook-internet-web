import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const StatusModal = ({ visible, toggle, status }) => {

  const formattedStatus = status;

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
