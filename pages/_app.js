// ** Ripple Button
import "src/@core/components/ripple-button";

// ** React Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";

// ** Third Party Packages
import ResizeObserver from "resize-observer-polyfill";

// ** Sidebar
import "styles/@core/base/pages/app-ecommerce.scss";

// ** Datepicker
import "styles/@core/react/libs/flatpickr/flatpickr.scss";
import "react-datepicker/dist/react-datepicker.css";

// ** React Toastify
import "styles/@core/react/libs/toastify/toastify.scss";

// ** React Slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "styles/custom/Slider.scss";

// wizard form
import "bs-stepper/dist/css/bs-stepper.min.css";
// import '../../../@core/scss/base/plugins/forms/form-wizard.scss'
import "styles/@core/base/plugins/forms/form-wizard.scss";
// import 'src/@core/scss/react/libs/react-select/_react-select.scss'
import "styles/@core/react/libs/react-select/_react-select.scss";

// ** Core Styling
import "styles/index.scss";
import "src/@core/assets/fonts/feather/iconfont.css";
import "styles/@core/core.scss";
import "styles/assets/style.scss";
import "animate.css/animate.css";
import "styles/@core/react/libs/flatpickr/flatpickr.scss";
import "styles/@core/base/pages/app-invoice.scss";
import "styles/@core/base/pages/app-invoice-print.scss";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// ** Redux
import { wrapper, store } from "redux/store";
import { Provider as ProviderRedux } from "react-redux";

// ** NextAuth
import { SessionProvider } from "next-auth/react";

// ** React-Quill
import "react-quill/dist/quill.snow.css";

import { Auth } from "helpers/authGlobalCheck";

import "styles/@core/base/pages/page-misc.scss";
import { usePageLoading } from "helpers/usePageLoading";
import { LoadingIndicator } from "components/shared";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useMobileDetector from "components/useMobileDetector";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const isMobileWidth = useMobileDetector();
  // const { user } = pageProps.userRoles;
  // Prevent error on macOS and iOS devices
  if (typeof window !== "undefined") {
    if (!window.ResizeObserver) {
      window.ResizeObserver = ResizeObserver;
    }
  }

  const router = useRouter();

  // SSR loading state
  const { isPageLoading } = usePageLoading();
  const [loading, setLoading] = useState(false);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Head>
          <title>E-Logbook - XYZ</title>
          <meta property="og:title" content="E-Logbook - XYZ" key="title" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Auth permittedRole={Component.auth ? Component.auth.roles : null}>
          <ProviderRedux store={store}>
            {isPageLoading ? (
              <LoadingIndicator />
            ) : (
              getLayout(<Component {...pageProps} />)
            )}
          </ProviderRedux>
        </Auth>
      </SessionProvider>
    </>
  );
};

export default wrapper.withRedux(App);
