import Link from "next/link";
import Image from "next/image";
import InputPasswordToggle from "src/@core/components/input-password-toggle";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import { getCsrfToken, getSession, signIn } from "next-auth/react";
import { useState, useEffect, useReducer } from "react";
import metadata from "appsettings.json";
import InputUsernameIcon from "src/@core/components/input-username-icon";
import { useRouter } from "next/router";
import {
  errorAlertNotification,
  errorAlertNotificationCode,
  errorAlertNotificationGlobal,
  successAlertNotification,
} from "components/notification";
import { onLoginGuest } from "helpers/auth";
import jwt_decode from "jwt-decode";
import useMobileDetector from "components/useMobileDetector";
const sign = require("jwt-encode");

const LoginPage = (props) => {
  const { csrfToken, query } = props;
  const isMobileWidth = useMobileDetector();
  const router = useRouter();
  const [loginLoading, setLoginLoading] = useState(false);
  const [isError, setIsError] = useState(query.error == "true" ? true : false);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [emailUser, setEmailUser] = useState(null);
  const secret = process.env.NEXT_PUBLIC_API_SECRET_KEY_JWT ?? "";

  useEffect(() => {
    if (query.error == "true") {
      setTimeout(() => {
        setIsError(false);
      }, 100);
    }
    if (query.isError == "true" || query.invalid == "true") {
      setTimeout(() => {
        setIsErrorValidate(false);
      }, 100);
    }
  }, []);

  const AlertError = () => {
    errorAlertNotificationGlobal(
      "Error",
      <div
        dangerouslySetInnerHTML={{
          __html: `Login failed, please contact administrator or helpdesk.`,
        }}
      ></div>
    );
    return <div />;
  };

  return (
    <div className="auth-wrapper auth-v2">
      {isError == true ? <AlertError /> : null}
      <Row className="auth-inner m-0">
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="12"
          sm="12"
        >
          <Col
            className="h-100 d-flex flex-column justify-content-between px-xl-2 mx-auto"
            sm="8"
            md="6"
            lg="8"
          >
            <div className="my-auto">
              <Link href="/">
                <a className="d-flex justify-content-center">
                  <Image
                    src="/images/logo/xyz-logo.png"
                    width={117}
                    height={49}
                  />
                </a>
              </Link>
              <CardTitle
                tag="h2"
                className="text-center font-weight-bold mt-2 mb-4"
              >
                E-Logbook
              </CardTitle>
              <Form
                className="auth-login-form mt-2"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsError(false);
                  setLoginLoading(true);
                  try {
                    if (
                      username === null ||
                      username === "" ||
                      password === null ||
                      password === ""
                    ) {
                      setLoginLoading(false);
                      return errorAlertNotification(
                        "Error",
                        "Username or password must be filled"
                      );
                    }
                    const response = await signIn("credentials", {
                      callbackUrl: query.url
                        ? `/home?url=${query.url}`
                        : "/home",
                      redirect: true,
                      username,
                      password,
                      applicationCode: "ELOGBOOK",
                      getProfile: true,
                      isMobileWidth: isMobileWidth,
                    });
                    if (response.error) {
                      errorAlertNotification(
                        "Error",
                        <div
                          dangerouslySetInnerHTML={{ __html: response.error }}
                        ></div>
                      );
                    }
                  } catch (err) {
                    console.log(err, "error");
                  }
                  setLoginLoading(false);
                }}
              >
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
                <FormGroup className="d-flex justify-content-center">
                  <Col sm="2" md="4" lg="6">
                    <Label className="form-label" for="login-email">
                      Username
                    </Label>
                    <InputUsernameIcon
                      className="input-group-merge"
                      id="username"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup className="d-flex justify-content-center">
                  <Col sm="2" md="4" lg="6">
                    <Label className="form-label" for="password">
                      Password
                    </Label>
                    <InputPasswordToggle
                      className="input-group-merge"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button.Ripple
                      type="submit"
                      disabled={loginLoading}
                      color="primary"
                      block
                      className="mt-2"
                    >
                      {loginLoading ? (
                        <>
                          <Spinner size="sm" color="white" />
                          <span className="ml-1">Logging in...</span>
                        </>
                      ) : (
                        "Login"
                      )}
                    </Button.Ripple>
                    {/* <Button.Ripple
                      color="primary"
                      block
                      className="mt-2"
                      onClick={() => router.push("/auth/signUp")}
                    >
                      Sign Up
                    </Button.Ripple> */}
                  </Col>
                </FormGroup>
              </Form>
            </div>
            <div className="auth-footer-btn d-flex flex-column justify-content-center align-items-center my-2">
              <p className="m-0">E-Logbook Version 1.0</p>
              <p className="m-0">
                &#169;{new Date().getFullYear()} - PT XYZ Tbk.
              </p>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { query, req, res } = ctx;

  const sessionData = await getSession(ctx);

  if (sessionData) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(ctx),
      authError: query.error ? true : false,
      query: query,
    },
  };
}

export default LoginPage;
