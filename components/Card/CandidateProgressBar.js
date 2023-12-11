import React from "react";
import { ProgressBar } from "react-progressbar-fancy";
import { Button, Card } from "reactstrap";

const CandidateProgressBar = ({ status }) => {
  const statusProgressMap = {
    fdd: 14,
    psychotest: 28,
    "interview hrd": 42,
    "interview user": 56,
    mcu: 70,
    training: 84,
    joined: 100,
  };

  let progressCheck = status ? statusProgressMap[status.toLowerCase()] || 0 : 0;

  return (
    <Card className="p-2">
      <div className="">
        <div className="d-flex align-items-center">
          <h3>
            <strong>Recruitment Status</strong>
          </h3>
        </div>
        <div className="mx-5 row">
          <div className="container my-2">
            <div className="row my-2">
              <div className="col-sm text-center">FDD</div>
              <div className="col-sm text-center">Psychotest</div>
              <div className="col-sm text-center">Interview <br></br>HRD</div>
              <div className="col-sm text-center">Interview <br></br>User</div>
              <div className="col-sm text-center">MCU</div>
              <div className="col-sm text-center">Training</div>
              <div className="col-sm text-center">Joined</div>
            </div>
            <ProgressBar
              score={progressCheck ? progressCheck : 0}
              progressColor="green"
              label=""
              primaryColor="#ffdb00"
              secondaryColor="#0f9b0f"
              disableGlow
              hideText
            />
          </div>
        </div>
        {/* <div className="d-flex justify-content-center my-1">
          <Button color="primary" href="#" tag="a">
            History Transfer
          </Button>
        </div> */}
      </div>
    </Card>
  );
};

export default CandidateProgressBar;
