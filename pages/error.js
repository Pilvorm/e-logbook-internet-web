import { useRouter } from "next/router";

const ErrorPage = ({ errorMessage }) => {
  return (
    <div className="container">
      <h1>Error Page</h1>
      <p>{errorMessage}</p>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;
  let errorMessage = "An error occurred during authentication.";

  if (query.error) {
    if (query.error === "tokenExpired") {
      return {
        redirect: {
          destination: "/auth?validate=true&isError=true",
          permanent: false,
        },
      };
    } else if (query.error === "tokenInvalid") {
      return {
        redirect: {
          destination: "/auth?validate=true&invalid=true",
          permanent: false,
        },
      };
    } else if (query.error === "errorLogin") {
      return {
        redirect: {
          destination: "/auth?error=true",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      errorMessage,
    },
  };
}

export default ErrorPage;
