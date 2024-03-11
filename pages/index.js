import React from "react";
import { getSession, signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { authenticate, storeUserRoles } from "redux/actions/auth";
import { wrapper } from "redux/store";
import { connect, useDispatch } from "react-redux";
import { API_URL } from "constant";
import axios from "axios";
import { getHeaders } from "helpers/utils";
import VerticalLayout from "src/layouts/VerticalLayout";
import { Carousel } from "react-responsive-carousel";
import Head from "next/head";

const InitialPage = ({ userRoles }) => {
  return (
    <>
      <div>
        <VerticalLayout newUser={true}>
          
        </VerticalLayout>
      </div>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const sessionData = await getSession(ctx);

    if (sessionData && sessionData.user) {
      store.dispatch(authenticate(sessionData.user.token));

      return {
        props: {
          sessionData: sessionData,
        },
        redirect: {
          destination: "/home",
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  }
);

export default connect((state) => state)(InitialPage);
