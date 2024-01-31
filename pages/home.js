import React, { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { wrapper } from "redux/store";
import VerticalLayout from "src/@core/layouts/VerticalLayout";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { getHeaders } from "helpers/utils";
import { storeUserRoles } from "redux/actions/auth";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Dashboard from "components/Dashboard/Dashboard";
import { useRouter } from "next/router";
import useMobileDetector from "components/useMobileDetector";
import {
  getAuthUser,
  getModule,
  getModuleMobile,
  getRoleUser,
} from "helpers/auth";
import { useSelector } from "react-redux";

import { getLogbookData, submitLogbook } from "redux/actions/logbook";

import moment from "moment";

const Home = ({
  userRoles,
  query,
  roles,
  sessionData,
  dataLogbook,
  holidayDates,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (query.url) {
      router.push({
        pathname: query.url,
      });
    }
  }, [query]);

  useEffect(() => {
    dispatch(storeUserRoles(roles));
  }, [dispatch]);

  const { data: session } = useSession();

  const currentDate = new Date();
  const [monthQuery, setMonthQuery] = useState(
    moment(currentDate).format("MMMM YYYY")
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

  const [monthDays, setMonthDays] = useState(setDays(monthQuery));
  const [daysInMonth, setDaysInMonth] = useState(
    moment(monthQuery, "MMMM YYYY").daysInMonth()
  );

  const initLogbookDays = () => {
    let count = daysInMonth;
    let arr = [];
    while (count) {
      arr.unshift({});
      count--;
    }
    return arr;
  };

  const [logbookDays, setLogbookDays] = useState(initLogbookDays()); //array with 31 empty objects

  const fillLogbookDays = () => {
    if (dataLogbook) {
      let index = 0;
      let temp = initLogbookDays();
      let logbookDaysLength = dataLogbook.data[0]?.logbookDays.length;
      for (var i = 0; i < logbookDaysLength; i++) {
        index =
          moment(dataLogbook.data[0]?.logbookDays[i].date).format("D") - 1;
        temp[index] = {
          ...dataLogbook.data[0]?.logbookDays[i],
          originalIndex: i,
        };
      }
      setLogbookDays(temp);
    }
  };

  useEffect(() => {
    fillLogbookDays();
  }, []);

  return (
    <>
      <div className="mt-3">
        <Dashboard
          sessionData={sessionData}
          monthDays={monthDays}
          dataLogbook={dataLogbook}
          logbookDays={logbookDays}
          holidayDates={holidayDates}
        />
      </div>
    </>
  );
};

// EXAMPLE USING PAGE PERMISSION
// Home.auth = {
//   roles: ["Admin Master Table Sourcing", "asdasd"],
// };

Home.getLayout = function getLayout(page) {
  return <VerticalLayout>{page}</VerticalLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const sessionData = await getSession(ctx);

    if (!sessionData) {
      return {
        redirect: {
          destination: "/auth",
          permanent: false,
        },
      };
    }

    let temp = [];
    try {
      if (sessionData) {
        if (sessionData.user.guest) {
          temp.push("INTERN");
        } else {
          const response = await getRoleUser(
            sessionData.user.UserPrincipalName.replace("@", "%40")
          );
          console.log("step 2", response);
          if (response.data != false) {
            response.data.map(async (item) => {
              return temp.push(item.roleCode); // multi roles
            });
          } else {
            return (temp = response.data[0].roleCode);
          }
        }
        store.dispatch(storeUserRoles(temp));
        // if (typeof window !== "undefined") {
        //   localStorage.setItem("tes", JSON.stringify(["tes", "ok"]))
        // }
      }
    } catch (err) {}

    const monthFilter = moment().format("MMMM");
    const yearFilter = moment().format("YYYY");

    await store.dispatch(
      getLogbookData({
        "CSTM-UPN": sessionData.user.UserPrincipalName,
        "X-PAGINATION": true,
        "X-FILTER": `upn=${sessionData.user.UserPrincipalName}|month=${monthFilter}|year=${yearFilter}`,
      })
    );

    const dataLogbook = store.getState().logbookReducers;

    const currentMonth = moment().format("M");
    const currentYear = moment().format("YYYY");

    const res = await fetch(
      `https://api-harilibur.vercel.app/api?month=${currentMonth}&year=${currentYear}`
    );
    const holidayDates = await res.json().then((data) => {
      return data.filter((date) => {
        return date.is_national_holiday;
      });
    });

    return {
      props: {
        userRoles: sessionData,
        query: ctx.query,
        roles: temp,
        sessionData,
        dataLogbook: dataLogbook,
        holidayDates,
      },
    };
  }
);

export default Home;
