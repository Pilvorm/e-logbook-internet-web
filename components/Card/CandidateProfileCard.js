import { fetchImage } from "helpers/shared";
import { useState, useEffect } from "react";
import { FileText } from "react-feather";
import { Button } from "reactstrap";
import Avatar from "src/@core/components/avatar";

export const CandidateProfileCard = ({
  nama,
  nik,
  ttl,
  noHp,
  noWhatsapp,
  email,
  gender,
  alamat,
  profilePicture,
  toggleFileAttachmentPopup,
}) => {
  const [profilePictureImg, setProfilePictureImg] = useState("");

  useEffect(() => {
    const getImageUrls = async () => {
      if (profilePicture) {
        const imageUrl = await fetchImage(profilePicture);
        setProfilePictureImg(imageUrl);
      }
    };

    getImageUrls();
  }, []);

  return (
    <div className="row">
      <div className="col-sm align-self-center d-flex justify-content-center">
        <Avatar img={profilePictureImg} imgWidth="200px" imgHeight="200px" />
      </div>
      <div className="col-sm">
        <div className=" d-flex flex-column my-2">
          <span className="">Nama Lengkap</span>
          <h4>
            <strong>{nama}</strong>
          </h4>
        </div>
        <div className=" d-flex flex-column my-2">
          <span>KTP</span>
          <h4 className="font-weight-bold">
            <strong>{nik}</strong>
          </h4>
        </div>
        <div className=" d-flex flex-column my-2">
          <span>Tempat, Tanggal Lahir</span>
          <h4 className="font-weight-bold">
            <strong>{ttl}</strong>
          </h4>
        </div>
      </div>

      <div className="col-sm">
        <div className=" d-flex flex-column my-2">
          <span>No. Handphone</span>
          <h4 className="font-weight-bold">
            <strong>{noHp}</strong>
          </h4>
        </div>
        <div className=" d-flex flex-column my-2">
          <span>No. Whatsapp</span>
          <h4 className="font-weight-bold">
            <strong>{noWhatsapp}</strong>
          </h4>
        </div>
        <div className=" d-flex flex-column my-2">
          <span>Email</span>
          <h4 className="font-weight-bold">
            <strong>{email}</strong>
          </h4>
        </div>
      </div>
      <div className="col-sm mr-5">
        <div className=" d-flex flex-column my-2">
          <span>Jenis Kelamin</span>
          <h4 className="">
            <strong>{gender}</strong>
          </h4>
        </div>
        {/* <div className=" d-flex flex-column my-3">
                <span></span>
                
            </div> */}
        <div className=" d-flex flex-column my-2 mr-5">
          <span>Alamat</span>
          <h4 className="">
            <strong>{alamat}</strong>
          </h4>
        </div>
      </div>
    </div>
  );
};
