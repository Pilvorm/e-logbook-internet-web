import React, { useRef, useState } from "react";
import { Plus } from "react-feather";
import Webcam from "react-webcam";
import { Button } from "reactstrap";

const CameraComponent = () => {
  const webcamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const startCamera = () => {
    setIsCameraOn(true);
  };

  const stopCamera = () => {
    setIsCameraOn(false);
  };

  return (
    <div>
      <h2>Camera Component</h2>
      {!isCameraOn ? (
        // <But onClick={startCamera}>Start Camera</But>
        <Button
          color="info"
          id="btnCreate"
          name="btnCreate"
          className="btn-next mr-1"
          onClick={startCamera}
        >
          <Plus size={18} className="mr-1" />
          Foto
        </Button>
      ) : (
        <div>
          <Webcam ref={webcamRef} />
          <Button
            color="danger"
            id="btnCreate"
            name="btnCreate"
            className="btn-next mr-1"
            onClick={stopCamera}
          >
            Stop Camera
          </Button>
        </div>
      )}
    </div>
  );
};

export default CameraComponent;
