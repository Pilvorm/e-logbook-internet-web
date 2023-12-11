import { Button } from "reactstrap";
import errorImg from "public/images/pages/error.svg";
import Link from "next/link";

function Error({ statusCode }) {
  return (
    <div className="misc-wrapper">
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">Error </h2>
          <p className="mb-2">Please contact our admin or helpdesk</p>
          <Link href="/">
            <Button className="btn-sm-block mb-2">Back to home</Button>
          </Link>
          {/* <img
            className="img-fluid"
            src="/images/pages/error.svg"
            alt="Not authorized page"
          /> */}
        </div>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
