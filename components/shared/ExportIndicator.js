import { Modal, ModalBody, Spinner } from "reactstrap";

const ExportIndicator = ({ isExportLoading }) => (
  <Modal centered isOpen={isExportLoading} toggle={() => {}}>
    <ModalBody className="d-flex flex-row justify-content-center align-items-center p-2">
      <Spinner color="primary" />
      <p className="ml-2 mr-0 my-0">Exporting data...</p>
    </ModalBody>
  </Modal>
);

export default ExportIndicator;
