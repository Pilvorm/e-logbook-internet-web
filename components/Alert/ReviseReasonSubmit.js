import React, { useState } from "react";
import { X } from "react-feather";

const ReviseReasonSubmit = ({ title, description, onClose, onConfirm }) => {
  const [noteRevise, setNoteRevise] = useState("");
  return (
    <React.Fragment>
      <div
        style={{ top: -100 }}
        className="bg-white position-absolute rounded col-10 col-md-12 p-0 m-0"
      >
        <div
          style={{ height: 28, width: 28, top: -14, right: -14 }}
          className="bg-white rounded d-flex justify-content-center align-items-center position-absolute"
          onClick={onClose}
        >
          <X className="text-muted" size={18} />
        </div>
        <div className="w-100 d-flex justify-content-start py-1 px-2 bg-warning rounded">
          <span className="text-white">{title ?? "Revise"}</span>
        </div>
        <div className="d-flex justify-content-start px-2 py-1">Reason</div>
        <div className="px-2">
          <textarea
            className="w-100 rounded p-1"
            style={{ borderColor: "gray" }}
            name=""
            id=""
            cols="30"
            rows="5"
            onChange={(e) => {
              setNoteRevise(e.target.value);
            }}
            value={noteRevise}
          />
        </div>
        <br />

        <div className="row p-1 d-flex justify-content-between">
          <div
            style={{ height: 32, cursor: "pointer" }}
            className="bg-warning px-2 rounded text-white d-flex justify-content-center align-items-center ml-2 cursor-pointer"
            onClick={() => onConfirm(noteRevise)}
          >
            OK
          </div>
          <div
            style={{ height: 32, cursor: "pointer" }}
            className="bg-white text-warning px-2 rounded text-white d-flex justify-content-center align-items-center mr-2 border border-warning cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReviseReasonSubmit;
