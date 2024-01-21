import { fetchImage } from "helpers/shared";
import { useState, useEffect } from "react";
import { FileText } from "react-feather";
import Avatar from "src/@core/components/avatar";
import { Eye, Edit, ExternalLink, Play } from "react-feather";
import { Button, Label, Col, Row } from "reactstrap";
import StatusModal from "components/modal/StatusModal";

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
  const [statusModal, setStatusModal] = useState(false);
  const toggleStatusModal = () => setStatusModal(!statusModal);
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
          <span>Working Days</span>
          <p className="">
            <strong>{workingDays}</strong>
          </p>
        </div>
        {/* <div className="d-flex flex-column mt-2">
          <span>Status</span>
          <p className="" style={{ color: "#46A583" }}>
            <strong>{status}</strong>
          </p>
        </div> */}
      </div>

      <div className="col-sm">
        <Button.Ripple
          id="statusBtn"
          color="warning"
          onClick={toggleStatusModal}
        >
          <Eye size={18} />
          <span className="align-middle ml-1 d-sm-inline-block d-none">
            Status
          </span>
          <StatusModal
            visible={statusModal}
            toggle={toggleStatusModal}
            status={status}
            pay={pay}
          />
        </Button.Ripple>
        {/* <div className="d-flex flex-column mt-2">
          <span>Pay</span>
          <p className="">
            <strong>{pay}</strong>
          </p>
        </div> */}
      </div>
    </div>
  );
};
