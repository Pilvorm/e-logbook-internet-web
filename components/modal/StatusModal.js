import { useState } from "react";
import { Eye } from "react-feather";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const StatusModal = ({ visible, toggle, status, pay }) => {
  const [showPay, setShowPay] = useState(false);

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
        <div className="w-100 py-1 d-flex flex-column justify-content-start">
          <div>
            <h5>Status</h5>
            <span>{status}</span>
          </div>
          <div className="mt-2">
            <h5>
              Pay{" "}
              <Eye
                size={14}
                style={{ cursor: "pointer" }}
                onClick={() => setShowPay(!showPay)}
              />
            </h5>
            <span>
              Rp {showPay ? pay.toLocaleString("de-DE") : "* * * * * * * *"}
            </span>
          </div>
        </div>
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
