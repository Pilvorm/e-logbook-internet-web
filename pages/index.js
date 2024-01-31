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
          <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center text-center align-middle">
            <Carousel
              showStatus={false}
              showThumbs={false}
              autoPlay
              interval={3000}
              infiniteLoop
              width={1200}
            >
              <div>
                <img src="/images/banner/newSlide1.jpg" />
              </div>
              <div>
                <img src="/images/banner/newSlide2.jpg" />
              </div>
              <div>
                <img src="/images/banner/newSlide3.jpg" />
              </div>
            </Carousel>
            <h1 className="mt-2">Selamat Datang</h1>
            <hr style={{ border: "1px solid #9cce34", width: "20%" }} />
            <p style={{ width: "50%" }}>
              Kalbe hadir untuk menyediakan solusi pelayanan kesehatan secara
              terpadu untuk seluruh tahapan usia dan kondisi kesehatan melalui
              produksi obat resep, obat bebas, produk kesehatan, produk nutrisi,
              serta layanan kesehatan yang berkelanjutan
            </p>
          </div>
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
