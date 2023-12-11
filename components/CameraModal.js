// import React, { useRef, useState, useEffect } from "react";
// import { Modal, ModalHeader, ModalBody, Button, Input } from "reactstrap";
// import Webcam from "react-webcam";

// const CameraModal = ({ isOpen, toggle, onCapture }) => {
//   const webcamRef = useRef(null);
//   const [cameraDimensions, setCameraDimensions] = useState({
//     width: "100%",
//     height: "100%",
//   });
//   const [notes, setNotes] = useState(""); // State to store notes

//   useEffect(() => {
//     const updateCameraDimensions = () => {
//       const modalContent = document.querySelector(".modal-content");
//       if (modalContent) {
//         const contentWidth = modalContent.clientWidth;
//         const contentHeight = modalContent.clientHeight;
//         setCameraDimensions({ width: contentWidth, height: contentHeight });
//       }
//     };

//     window.addEventListener("resize", updateCameraDimensions);

//     updateCameraDimensions();

//     return () => {
//       window.removeEventListener("resize", updateCameraDimensions);
//     };
//   }, []);

//   const capturePhoto = () => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       const photoData = {
//         photo: imageSrc,
//         notes: notes, // Include notes in the captured photo data
//       };
//       onCapture(photoData); // Pass the captured photo data to the parent component
//     }
//   };

//   const clearImageAndCloseModal = () => {
//     toggle();
//   };

//   return (
//     <Modal isOpen={isOpen} toggle={clearImageAndCloseModal} size="lg">
//       <ModalHeader toggle={clearImageAndCloseModal}>
//         Camera Component
//       </ModalHeader>
//       <ModalBody>
//         <Webcam
//           ref={webcamRef}
//           style={{
//             width: cameraDimensions.width,
//             height: cameraDimensions.height,
//           }}
//           videoConstraints={{ facingMode: "environment" }}
//         />

//         <Input
//           type="textarea"
//           placeholder="Notes"
//           value={notes}
//           onChange={(e) => setNotes(e.target.value)}
//           rows="4"
//         />
//         <div className="mt-2">
//           <Button color="primary" onClick={capturePhoto} className="mr-2">
//             Capture
//           </Button>
//           <Button color="danger" onClick={clearImageAndCloseModal}>
//             Stop Camera
//           </Button>
//         </div>
//       </ModalBody>
//     </Modal>
//   );
// };

// export default CameraModal;

import React, { useRef, useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, Button, Input } from "reactstrap";
import Webcam from "react-webcam";

const CameraModal = ({ isOpen, toggle, onCapture }) => {
  const webcamRef = useRef(null);
  const [cameraDimensions, setCameraDimensions] = useState({
    width: "100%",
    height: "100%",
  });
  const [notes, setNotes] = useState(""); // State to store notes

  useEffect(() => {
    const updateCameraDimensions = () => {
      const modalContent = document.querySelector(".modal-content");
      if (modalContent) {
        const contentWidth = modalContent.clientWidth;
        const contentHeight = modalContent.clientHeight;
        setCameraDimensions({ width: contentWidth, height: contentHeight });
      }
    };

    window.addEventListener("resize", updateCameraDimensions);

    updateCameraDimensions();

    return () => {
      window.removeEventListener("resize", updateCameraDimensions);
    };
  }, []);

  const clearImageAndCloseModal = () => {
    setNotes("");
    toggle();
  };

  const capturePhoto = () => {
    if (webcamRef.current && notes.length != 0) {
      const imageSrc = webcamRef.current.getScreenshot();
      const photoData = {
        photo: imageSrc,
        notes: notes, // Include notes in the captured photo data
      };
      onCapture(photoData); // Pass the captured photo data to the parent component
      clearImageAndCloseModal(); // Close the modal after capturing
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={clearImageAndCloseModal} size="lg">
      <ModalHeader toggle={clearImageAndCloseModal}>
        Camera Component
      </ModalHeader>
      <ModalBody>
        <div className="d-flex justify-content-center mb-1">
          <Webcam
            ref={webcamRef}
            style={{
              width: cameraDimensions.width,
              height: cameraDimensions.height,
            }}
            videoConstraints={{ facingMode: "environment" }}
          />
        </div>

        <Input
          type="textarea"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="4"
        />
        <div className="mt-2 d-flex justify-content-between">
          <Button color="primary" onClick={capturePhoto} className="mr-2">
            Capture
          </Button>
          <Button color="danger" onClick={clearImageAndCloseModal}>
            Stop Camera
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default CameraModal;
