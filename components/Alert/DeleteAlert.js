import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";

const DeleteAlert = ({ isDeleteModal, setIsDeleteModal, handleDelete }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  return (
    <Modal
      centered
      isOpen={isDeleteModal}
      toggle={() => (deleteLoading ? {} : setIsDeleteModal(false))}
    >
      <ModalHeader
        className="modalHeaderTextNotePopUp bg-danger"
        toggle={() => (deleteLoading ? {} : setIsDeleteModal(false))}
      >
        Delete
      </ModalHeader>
      <ModalBody>Are you sure you want to delete this data?</ModalBody>
      <ModalFooter>
        <Button.Ripple
          color="danger"
          disabled={deleteLoading}
          onClick={(e) => {
            setDeleteLoading(true);
            handleDelete(e);
          }}
        >
          {deleteLoading ? (
            <>
              <Spinner size="sm" color="white" />
              <span className="ml-50">Deleting...</span>
            </>
          ) : (
            "Delete"
          )}
        </Button.Ripple>
        <Button.Ripple
          outline
          color="danger"
          disabled={deleteLoading}
          onClick={() => setIsDeleteModal(false)}
        >
          Cancel
        </Button.Ripple>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteAlert;
