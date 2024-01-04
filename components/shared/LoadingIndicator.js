import Image from "next/image";
import metadata from "appsettings.json";
import { Spinner } from "reactstrap";

import fullLogo from "/public/images/logo/xyz-full-logo.png";

const LoadingIndicator = () => {
  const logoScalingFactor = 0.1;

  return (
    <div className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex justify-content-center align-items-center">
        <Image
          src={fullLogo}
          width={logoScalingFactor * 1566}
          height={logoScalingFactor * 634}
        />
        <div className="border-left ml-3 pl-3 py-2">
          <h1 className="m-0">E-Logbook</h1>
          <p className="m-0">{`v${metadata.appVersion}`}</p>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner />
        <p className="ml-2 m-0">Loading data...</p>
      </div>
    </div>
  );
};

export default LoadingIndicator;
