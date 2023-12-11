import React from "react";
import { FormGroup, Input } from "reactstrap";

const CustomScrollbar = ({ currentPos }) => {
  return (
    <div
      style={{
        height: 6,
        width: "100%",
        borderRadius: 5,
        backgroundColor: "gray",
      }}
      className="w-100"
    >
      <div
        style={{ height: 6, borderRadius: 10, width: `${currentPos}%` }}
        className="bg-success d-flex justify-content-end align-items-center"
      >
        <div
          style={{
            backgroundColor: "white",
            height: 14,
            width: 14,
            borderRadius: 10,
          }}
          className="border border-success"
        ></div>
      </div>
    </div>
  );
};

export default CustomScrollbar;
