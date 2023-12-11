import { fetchImage } from "helpers/shared";
import { useState, useEffect } from "react";
import { FileText } from "react-feather";
import Avatar from "src/@core/components/avatar";
import { Label, Col, Row } from "reactstrap";

export const InternDetailCard = ({
  nama,
  department,
  school,
  faculty,
  month,
  status,
  workingDays,
  pay,
}) => {
  return (
    <div className="row">
      <div className="col-sm">
        <div className="d-flex flex-column">
          <span className="">Nama Lengkap</span>
          <p>
            <strong>{nama}</strong>
          </p>
        </div>
        <div className="d-flex flex-column mt-2">
          <span>Division/Department</span>
          <p className="font-weight-bold">
            <strong>{department}</strong>
          </p>
        </div>
      </div>

      <div className="col-sm">
        <div className="d-flex flex-column">
          <span>School/College</span>
          <p className="font-weight-bold">
            <strong>{school}</strong>
          </p>
        </div>
        <div className="d-flex flex-column mt-2">
          <span>Faculty</span>
          <p className="font-weight-bold">
            <strong>{faculty}</strong>
          </p>
        </div>
      </div>

      <div className="col-sm">
        <div className="d-flex flex-column">
          <span>Month</span>
          <p className="">
            <strong>{month}</strong>
          </p>
        </div>
        <div className="d-flex flex-column mt-2">
          <span>Status</span>
          <p className="" style={{ color: "#46A583" }}>
            <strong>{status}</strong>
          </p>
        </div>
      </div>

      <div className="col-sm">
        <div className="d-flex flex-column">
          <span>Working Days</span>
          <p className="">
            <strong>{workingDays}</strong>
          </p>
        </div>
        <div className="d-flex flex-column mt-2">
          <span>Pay</span>
          <p className="">
            <strong>{pay}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
