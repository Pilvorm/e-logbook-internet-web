import Image from "next/image";

const UserOptionItem = ({ profilePicture, name, subtitle }) => {
  return (
    <div className="d-flex align-items-center">
      <div className="d-flex flex-row justify-content-center align-items-center position-relative">
        <Image
          src={profilePicture}
          width={36}
          height={36}
          className="image-inside border-radius-50"
          style={{ objectFit: "cover", borderRadius: "50%" }}
        />
      </div>
      <div className="mx-50"></div>
      <div>
        <p className="body-copy font-weight-bold m-0">{name}</p>
        {subtitle && <p className="body-copy text-muted m-0">{subtitle}</p>}
      </div>
    </div>
  );
};

export default UserOptionItem;
