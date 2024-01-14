import { HTTP_CODE, SYSTEM_ADMIN, SUPER_USER } from "constant";

import BreadCrumbs from "components/custom/BreadcrumbCustom";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Eye, Edit, ExternalLink, Play } from "react-feather";
import { Button, Card, Col, CustomInput, Label, Row, Table } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import { reauthenticate } from "redux/actions/auth";
import { wrapper } from "redux/store";

import {
  confirmAlertNotification,
  errorAlertNotification,
  successAlertNotification,
  deleteAlertNotification,
} from "components/notification";
import VerticalLayout from "src/@core/layouts/VerticalLayout";
import { InternDetailCard } from "components/Card/InternDetailCard";
import StatusModal from "components/modal/StatusModal";
import EntryLogbook from "components/modal/form/EntryLogbook";
import { FloatingHeader, useOnScreen } from "components/Header/FloatingHeader";

import { getAllMasterUserInternal } from "redux/actions/master/userInternal";
import { getLogbookData } from "redux/actions/logbook";
import { getPermissionComponentByRoles } from "helpers/getPermission";

import moment from "moment";

const EntryRow = ({ data, index, monthQuery, sessionData, logbookData }) => {
  const [editPopup, setEditPopup] = useState(false);
  const toggleEditPopup = () => setEditPopup(!editPopup);

  const currentDate = new Date();
  const isWeekend = moment(data).day() == 6 || moment(data).day() == 0;
  const isFutureDate = moment(data).toDate() > currentDate;

  return (
    <tr key={index}>
      <td>{index + 1}.</td>
      <td style={{ color: isWeekend && "#DAD8DF" }}>
        {data.format("ddd, DD MMM YYYY")}
      </td>
      <td
        className="text-left"
        style={{ width: "40%", color: isWeekend && "#DAD8DF" }}
      >
        {isWeekend ? "OFF" : `${logbookData[index]?.activity ?? "-"}`}
      </td>
      <td>{isWeekend ? "" : `${logbookData[index]?.workType ?? "-"}`}</td>
      <td style={{ color: "#46A583" }}>{isWeekend ? "" : "Approved by ..."}</td>
      <td>
        {isWeekend || isFutureDate ? (
          ""
        ) : (
          <Button.Ripple
            outline={!logbookData[index]?.activity}
            type="submit"
            color="warning"
            className="btn-next"
            onClick={toggleEditPopup}
          >
            <Edit size={18} />
            <span className="ml-50 align-middle d-sm-inline-block d-none">
              Entry
            </span>
            <EntryLogbook
              visible={editPopup}
              toggle={toggleEditPopup}
              date={data}
              monthQuery={monthQuery}
              sessionData={sessionData}
              logbookData={logbookData[index]}
            />
          </Button.Ripple>
        )}
      </td>
    </tr>
  );
};

const WeekendRow = ({ data, index }) => {
  const [editPopup, setEditPopup] = useState(false);
  const toggleEditPopup = () => setEditPopup(!editPopup);

  const currentDate = new Date();
  const isWeekend = moment(data).day() == 6 || moment(data).day() == 0;
  const isFutureDate = moment(data).toDate() > currentDate;

  return (
    isWeekend && (
      <tr key={index}>
        <td>{index + 1}.</td>
        <td style={{ color: isWeekend && "#DAD8DF" }}>
          {data.format("ddd, DD MMM YYYY")}
        </td>
        <td
          className="text-left"
          style={{ width: "40%", color: isWeekend && "#DAD8DF" }}
        >
          {isWeekend ? "OFF" : "Lorem"}
        </td>
        <td>{isWeekend ? "" : "WFH"}</td>
        <td style={{ color: "#46A583" }}>
          {isWeekend ? "" : "Approved by ..."}
        </td>
        <td>
          {isWeekend || isFutureDate ? (
            ""
          ) : (
            <Button.Ripple
              outline
              type="submit"
              color="warning"
              className="btn-next"
              onClick={toggleEditPopup}
            >
              <Edit size={18} />
              <span className="ml-50 align-middle d-sm-inline-block d-none">
                Edit
              </span>
              <EntryLogbook
                visible={editPopup}
                toggle={toggleEditPopup}
                date={data.format("ddd, DD MMM YYYY")}
                //   data={data}
              />
            </Button.Ripple>
          )}
        </td>
      </tr>
    )
  );
};

const Logbook = (props) => {
  const { token, sessionData, query, dataLogbook, dataFilter } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(reauthenticate(token));
  }, [dispatch]);

  const { containerRef, isInView } = useOnScreen();
  const currentDate = new Date();
  const startDate = moment("2023-02-20T12:00:00Z");
  const endDate = moment("2024-02-16T12:00:00Z");

  // Set Period Function
  const setPeriod = (start, end) => {
    const period = [];
    for (
      var m = moment(start);
      m.diff(end, "months") <= 0;
      m.add(1, "months")
    ) {
      period.push(m.format("YYYY-MM-DD"));
    }
    return period;
  };

  const [internshipPeriod, setInternshipPeriod] = useState(
    setPeriod(startDate, endDate)
  );
  const [monthQuery, setMonthQuery] = useState(
    query?.month ?? moment(currentDate).format("MMMM YYYY")
  );

  // Handle Chosen Month Days
  const setDays = (month) => {
    var daysInMonth = moment(month, "MMMM YYYY").daysInMonth();
    var arrDays = [];

    while (daysInMonth) {
      var current = moment(`${month} ${daysInMonth}`, "MMMM YYYY DD");
      // if (!(moment(current).day() == 6 || moment(current).day() == 0)) {
      arrDays.unshift(current);
      // }
      daysInMonth--;
    }
    return arrDays;
  };

  const isWeekend = (day) => {
    if (moment(day).day() == 6 || moment(day).day() == 0) {
      return true;
    }
    return false;
  };

  const [monthDays, setMonthDays] = useState(setDays(monthQuery));
  const [daysInMonth, setDaysInMonth] = useState(
    moment(monthQuery, "MMMM YYYY").daysInMonth()
  );

  const initLogbookData = () => {
    let count = daysInMonth;
    let arr = [];
    while (count) {
      arr.unshift({});
      count--;
    }
    return arr;
  };

  const [mainLogbookData, setMainLogbookData] = useState(initLogbookData()); //array with 31 empty objects

  const fillMainLogbookData = () => {
    let index = 0;
    let temp = initLogbookData();
    let logbookDaysLength = dataLogbook.data[0].logbookDays.length;
    for (var i = 0; i < logbookDaysLength; i++) {
      index = moment(dataLogbook.data[0].logbookDays[i].date).day() - 1;
      temp[index] = dataLogbook.data[0].logbookDays[i];
    }
    setMainLogbookData(temp);
  };

  useEffect(() => {
    fillMainLogbookData();
  }, []);

  console.log("OK");
  console.log(mainLogbookData);

  const handleMonthChange = (value) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...dataFilter,
        month: value,
      },
    });
  };

  return (
    <div>
      <BreadCrumbs breadCrumbParent="Internship" breadCrumbActive="Logbook" />
      <div className="d-flex align-items-center my-3">
        <h2>Intern Logbook</h2>
      </div>

      <Card className="p-2 d-flex">
        <div className="flex-col align-items-center ">
          <div className="">
            <InternDetailCard
              nama={`${sessionData.user.Name}`}
              department={`${sessionData.user.Dept}`}
              school={`${sessionData.user.SchoolName}`}
              faculty={`${sessionData.user.Faculty}`}
              month={`${monthQuery}`}
              status="Complete"
              workingDays="14 WFH / 8 WFO"
              pay="Rp 1.920.000"
            />
            {/* <InternDetailCard
              nama={`Daniel Emerald Sumarly`}
              department={`Corporate IT`}
              school={`Bina Nusantara University`}
              faculty={`Computer Science`}
              month={`${monthQuery}`}
              status="Complete"
              workingDays="14 WFH / 8 WFO"
              pay="Rp 1.920.000"
            /> */}
          </div>
        </div>
      </Card>
      <div className="d-flex justify-content-between align-items-center w-100 flex-wrap mb-2">
        <div className="d-flex align-items-center mr-2">
          <Label for="rows-per-page" className="font-weight-bold">
            Month
          </Label>
          <CustomInput
            className="form-control ml-1 pr-5"
            type="select"
            id="rows-per-page"
            value={monthQuery}
            onChange={(e) => handleMonthChange(e.target.value)}
          >
            {internshipPeriod.map((month, index, obj) => (
              <option key={month} value={moment(month).format("MMMM YYYY")}>
                {index === 0 || moment(month).format(`MMMM`) === "January"
                  ? moment(month).format(`MMMM YYYY`)
                  : moment(month).format(`MMMM`)}
              </option>
            ))}
          </CustomInput>
        </div>

        <div className="d-flex align-items-center">
          <Button.Ripple
            id="saveBtn"
            className="ml-1"
            color="warning"
            onClick={() => {
              onSaveHandler(transformAndValidation(formik.values));
            }}
          >
            <ExternalLink size={18} />
            <span className="align-middle ml-1 d-sm-inline-block d-none">
              Export to PDF
            </span>
          </Button.Ripple>
          <Button.Ripple
            id="saveBtn"
            className="ml-1"
            color="primary"
            onClick={() => {
              onSaveHandler(transformAndValidation(formik.values));
            }}
          >
            <Play size={18} />
            <span className="align-middle ml-1 d-sm-inline-block d-none">
              Submit
            </span>
          </Button.Ripple>
        </div>
      </div>
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
        <tbody className="text-center text-break">
          {monthDays &&
            monthDays.map((data, index) => (
              <EntryRow
                key={index}
                data={data}
                index={index}
                monthQuery={monthQuery}
                sessionData={sessionData}
                logbookData={mainLogbookData}
              />
            ))}
        </tbody>
      </Table>
      <Row className="mt-1 mb-3">
        <Col
          className="d-flex align-items-center justify-content-start"
          md="9"
          sm="12"
        >
          <span>Signed</span>
        </Col>
      </Row>
    </div>
  );
};

Logbook.getLayout = function getLayout(page) {
  return <VerticalLayout>{page}</VerticalLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { query } = ctx;
    const sessionData = await getSession(ctx);

    if (!sessionData) {
      return {
        redirect: {
          destination: `/auth?url=${ctx.resolvedUrl}`,
          permanent: false,
        },
      };
    }

    const token = sessionData.user.token;

    store.dispatch(reauthenticate(token));

    await store.dispatch(
      getLogbookData({
        "CSTM-UPN": sessionData.user.UserPrincipalName,
      })
    );

    const dataLogbook = store.getState().logbookReducers;

    return {
      props: {
        query,
        token,
        dataLogbook,
        sessionData,
        dataFilter: query,
      },
    };
  }
);

export default connect((state) => state)(Logbook);
