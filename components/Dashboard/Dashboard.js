import React from "react";
import { useState, useEffect } from "react";
import { Card, Row, Col, Button, Table } from "reactstrap";
import { Edit } from "react-feather";
import Image from "next/image";

import CarouselComponent from "components/Carousel";
import { CustomBadge } from "components/Badge/CustomBadge";
import EntryLogbookShortcut from "components/modal/form/EntryLogbookShortcut";

import moment from "moment";

const LogbookRow = ({
  jsDate,
  index,
  dataLogbook,
  logbookDays,
  holidayDates,
}) => {
  const [editPopup, setEditPopup] = useState(false);
  const toggleEditPopup = () => setEditPopup(!editPopup);

  const currentDate = new Date();
  const isWeekend = moment(jsDate).day() == 6 || moment(jsDate).day() == 0;
  const isFutureDate = moment(jsDate).toDate() > currentDate;
  var holidayIndex = holidayDates
    .map((date) => {
      return date.holiday_date;
    })
    .indexOf(jsDate.format("YYYY-MM-D"));
  const isHoliday = holidayIndex > -1;
  const holidayName = holidayDates[holidayIndex]?.holiday_name ?? "";
  const blockEntry = isWeekend || isHoliday ? true : false;
  const currEntry = logbookDays[index];
  const ogIdx = currEntry.originalIndex ?? "";

  return (
    <tr key={jsDate}>
      <td>{index + 1}.</td>
      <td style={{ color: blockEntry && "#CAC7D1" }}>
        {jsDate.format("ddd, DD MMM YYYY")}
      </td>
      <td
        className="text-left"
        style={{ width: "40%", color: blockEntry && "#CAC7D1" }}
      >
        {isHoliday
          ? holidayName
          : isWeekend
          ? "OFF"
          : `${currEntry?.activity ?? "-"}`}
      </td>
      <td style={{ width: "2%" }}>
        {blockEntry ? "" : `${currEntry?.workType ?? "-"}`}
      </td>
      <td
        style={{
          width: "15%",
          color: dataLogbook?.status.includes("Approved")
            ? "#46A583"
            : "#FF5B5C",
        }}
      >
        {blockEntry || !currEntry?.activity
          ? ""
          : dataLogbook?.status.includes("Approved")
          ? "Approved"
          : `Waiting for Approval`}
      </td>
    </tr>
  );
};

const Dashboard = (props) => {
  const { sessionData, monthDays, dataLogbook, logbookDays, holidayDates } =
    props;
  const [editPopup, setEditPopup] = useState(false);
  const toggleEditPopup = () => setEditPopup(!editPopup);

  const [clock, setClock] = useState(moment().format("h:mm A"));

  const [currentMonth, setCurrentMonth] = useState(
    moment().format("MMMM YYYY")
  );

  const [currentDayEntry, setCurrentDayEntry] = useState(
    logbookDays[moment().format("D") - 1]
  );

  const isWeekend = moment().day() == 6 || moment().day() == 0;

  var holidayIndex = holidayDates
    .map((date) => {
      return date.holiday_date;
    })
    .indexOf(moment().format("YYYY-MM-D"));
  const isHoliday = holidayIndex > -1;
  const holidayName = holidayDates[holidayIndex]?.holiday_name ?? "";

  // console.log("OK");
  // console.log(currentDayEntry);

  // console.log(sessionData);

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
              {sessionData.user.Status == "Unconfirmed" ? (
                <CustomBadge type="danger" content="UNCONFIRMED" />
              ) : (
                <CustomBadge type="success" content="INTERN" />
              )}{" "}
              — {sessionData.user.UserPrincipalName}
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
                </tr>
              </thead>
              <tbody className="text-center text-break">
                {monthDays &&
                  monthDays.map((date, index) => (
                    <LogbookRow
                      jsDate={date}
                      index={index}
                      sessionData={sessionData}
                      dataLogbook={dataLogbook.data[0]} //currentDoc
                      logbookDays={logbookDays}
                      holidayDates={holidayDates}
                    />
                  ))}
              </tbody>
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
            <span className="my-2">
              {isHoliday
                ? holidayName
                : isWeekend
                ? "OFF"
                : `${logbookDays[moment().format("D") - 1].activity ?? "-"}`}
            </span>
            <span className="mb-3">
              <CustomBadge
                type={"INFO"}
                content={
                  isHoliday
                    ? "Holiday"
                    : isWeekend
                    ? "OFF"
                    : `${logbookDays[moment().format("D") - 1].activity ?? "-"}`
                }
              />
            </span>
            <Button.Ripple
              outline={!logbookDays[moment().format("D") - 1]?.activity}
              type="submit"
              color="primary"
              className="btn-next w"
              onClick={toggleEditPopup}
              disabled={
                isHoliday ||
                isWeekend ||
                sessionData.Status.includes("Unconfirmed")
              }
            >
              <Edit size={18} />
              <span className="ml-50 align-middle d-sm-inline-block d-none">
                Entry
              </span>
              <EntryLogbookShortcut
                visible={editPopup}
                toggle={toggleEditPopup}
                jsDate={moment()}
                currentMonth={currentMonth}
                sessionData={sessionData}
                dataLogbook={dataLogbook.data[0]}
                currEntry={logbookDays[moment().format("D") - 1]}
              />
            </Button.Ripple>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
