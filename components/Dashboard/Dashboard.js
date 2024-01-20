import React from "react";
import { useState, useEffect } from "react";
import { Card, Row, Col, Button, Table } from "reactstrap";
import { Edit } from "react-feather";
import Image from "next/image";

import CarouselComponent from "components/Carousel";
import { CustomBadge } from "components/Badge/CustomBadge";
import EntryLogbook from "components/modal/form/EntryLogbook";

import moment from "moment";

const Dashboard = (props) => {
  const { sessionData } = props;
  const [editPopup, setEditPopup] = useState(false);
  const toggleEditPopup = () => setEditPopup(!editPopup);

  const [clock, setClock] = useState(moment().format("h:mm A"));

  const [currentMonth, setCurrentMonth] = useState(
    moment().format("MMMM YYYY")
  );

  useEffect(() => {
    let timer;
    if (clock) {
      timer = setInterval(() => {
        setClock(moment().format("h:mm A"));
      }, 1000);
    }
    () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <Row>
        <Col md="8">
          <Card tag={Col} className="shadow p-2 d-flex" style={{ gap: "4px" }}>
            <h4 className="fontweight-normal">Hello,</h4>
            <h3>{sessionData.user.Name}</h3>
            <span style={{ color: "#B9B9C3" }}>
              <CustomBadge type="success" content="INTERN" /> —
              {sessionData.user.UserPrincipalName}
            </span>
          </Card>
          <Card tag={Col} className="shadow p-2 d-flex" style={{ gap: "4px" }}>
            <h4 className="fontweight-normal">Logbook {currentMonth}</h4>
            <Table responsive className="border">
              <thead className="text-center">
                <tr>
                  <th>No.</th>
                  <th>Date</th>
                  <th>Activity</th>
                  <th>WFH/WFO</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
            </Table>
          </Card>
        </Col>
        <Col md="4">
          <Card className="shadow p-2">
            <div className="d-flex justify-content-between">
              <span>{moment(new Date()).format("dddd, DD MMMM YYYY")}</span>
              <span>{clock}</span>
            </div>
            <span className="mt-3" style={{ color: "#B9B9C3" }}>
              Today's activity
            </span>
            <span className="mt-2 mb-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a
              nisi a augue lacinia venenatis. Proin condimentum mi vitae quam
              efficitur lobortis.
            </span>
            <span className="mb-3">
              <CustomBadge type={"INFO"} content="WFH" />
            </span>
            <Button.Ripple
              // outline={!logbookDays[index]?.activity}
              type="submit"
              color="warning"
              className="btn-next w"
              onClick={toggleEditPopup}
            >
              <Edit size={18} />
              <span className="ml-50 align-middle d-sm-inline-block d-none">
                Entry
              </span>
              <EntryLogbook
                visible={editPopup}
                toggle={toggleEditPopup}
                date={moment()}
                // monthQuery={monthQuery}
                // sessionData={sessionData}
                // dataLogbook={dataLogbook}
                // logbookDays={logbookDays[index]}
              />
            </Button.Ripple>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
