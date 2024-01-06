import React, { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { wrapper } from "redux/store";
import VerticalLayout from "src/@core/layouts/VerticalLayout";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { API_USER_URL } from "constant";
import { getHeaders } from "helpers/utils";
import { storeUserRoles } from "redux/actions/auth";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Dashboard from "components/Dashboard/Dashboard";
import DashboardChart from "components/Dashboard/DashboardChart";
import DashboardComplaint from "components/Dashboard/DashboardComplaint";
import { useRouter } from "next/router";
import useMobileDetector from "components/useMobileDetector";
import DashboardAccident from "components/Dashboard/DashboardAccident";
import DashboardNearmiss from "components/Dashboard/DashboardNearmiss";
import DashboardVictim from "components/Dashboard/DashboardVictim";
import {
  getAuthUser,
  getModule,
  getModuleMobile,
  getRoleUser,
} from "helpers/auth";
import { useSelector } from "react-redux";

const Home = ({ userRoles, query, roles, sessionData }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isMobileWidth = useMobileDetector();
  const [moduleMobile, setModuleMobile] = useState([]);

  useEffect(async () => {
    if (isMobileWidth) {
      const res = await getModuleMobile();
      console.log(res, "<<<<<");
      setModuleMobile(res.data);
    }
  }, [isMobileWidth]);

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
  console.log(session);

  return (
    <>
      <div className="mt-3">
        <Dashboard />
        <div className="mt-1"></div>
      </div>
      <div className="mt-3">
        <DashboardChart />
      </div>
      <div className="mt-3">
        <DashboardComplaint />
        <div className="mt-2"></div>
      </div>
      <div className="mt-3">
        <DashboardAccident />
      </div>
      <div className="mt-3">
        <DashboardNearmiss />
      </div>
      <div className="mt-3">
        <DashboardVictim />
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
              if (item.applicationCode === "ELOGBOOK") {
                return temp.push(item.roleCode); // multi roles
              }
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
    console.log(temp, "temp");

    return {
      props: {
        userRoles: sessionData,
        query: ctx.query,
        roles: temp,
        sessionData,
      },
    };
  }
);

export default Home;
