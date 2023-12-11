import React from "react";
import { Col, Row } from "reactstrap";
import WelcomeCard from "components/Card/WelcomeCard";
import StatisticCard from "components/Card/StatisticCard";
import CalendarCard from "components/Card/CalendarCard";
import ReviewBPM from "components/Card/ReviewBPMCard";

const MainDashboard = () => {
  return (
    <React.Fragment>
      <Row>
        <Col lg="3">
          <WelcomeCard />
        </Col>
        <Col>
          <StatisticCard cols="1" />
        </Col>
      </Row>
      <Row>
        <Col xs="12" lg="4" xl="3">
          <CalendarCard />
        </Col>
        <Col xs="12" lg="8" xl="9">
          <ReviewBPM />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default MainDashboard;
