import React from "react";

export const CandidateDataCard = ({
  title,
  data,
  title2,
  data2,
  title3,
  data3,
  title4,
  data4,
  title5,
  data5,
  data5B,
  title6,
  data6,
}) => (
  <div className="">
    <div className="mb-2">
      <div style={{ marginBottom: "0.5rem" }}>{title}</div>
      <h4 className="">
        <strong>{data}</strong>
      </h4>
    </div>
    <div className="my-2">
      <div style={{ marginBottom: "0.5rem" }}>{title2}</div>
      <h4>
        <strong>{data2}</strong>
      </h4>
    </div>
    <div className="my-2">
      <div style={{ marginBottom: "0.5rem" }}>{title3}</div>
      <h4>
        <strong>{data3}</strong>
      </h4>
    </div>
    <div className="my-2">
      <div style={{ marginBottom: "0.5rem" }}>{title4}</div>
      <h4>
        <strong>{data4}</strong>
      </h4>
    </div>
    <div className="my-2">
      <div style={{ marginBottom: "0.5rem" }}>{title5}</div>
      <h4 className="">
        <strong>{data5}</strong>
      </h4>
      <h4>
        <strong>{data5B}</strong>
      </h4>
    </div>
    <div className="my-2">
      <div style={{ marginBottom: "0.5rem" }}>{title6}</div>
      <h4>
        <strong>{data6}</strong>
      </h4>
    </div>
  </div>
);
