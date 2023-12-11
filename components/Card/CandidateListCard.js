import React, { useEffect, useState } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Badge,
  Media,
  CardFooter,
} from "reactstrap";

import Avatar from "src/@core/components/avatar";
import { File, FileText, Mail, Phone } from "react-feather";
import BadgePill from "components/Badge/BadgePill";
import { useRouter } from "next/router";
import { fetchImage } from "helpers/shared";

export const CandidateListCard = ({
  profilePicture,
  name,
  participantId,
  email,
  phone,
  ktp,
  progress,
  id,
}) => {
  const router = useRouter();
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
    <div
      className=""
      style={{
        width: "24rem",
        height: "22rem",
      }}
    >
      <Card className="border border-dark h-100 my-1">
        <CardTitle className="">
          <div className="d-flex justify-content-between align-items-center mt-2 ml-1 mb-n1 h-100">
            <Media>
              <Avatar
                className="mr-1 d-flex align-self-center ml-1"
                img={profilePictureImg}
                imgHeight="50"
                imgWidth="50"
              />
              <Media body>
                <div className="d-flex align-self-center flex-column">
                  <span className="text-wrap">
                    <strong>{name}</strong>
                  </span>
                  <h6 className="">{participantId}</h6>
                </div>
              </Media>
            </Media>
          </div>
        </CardTitle>
        {/* <CardTitle className="">
          <div className="d-flex justify-content-between align-items-center mt-2 ml-1 mb-n1 h-100 text-center">
            <Media body>
              <div className="d-flex align-self-center flex-column">
                <span className="text-wrap">
                  <strong>{name}</strong>
                </span>
                <h6 className="">{participantId}</h6>
              </div>
            </Media>
          </div>
        </CardTitle> */}

        <CardBody className="mt-n2 mb-n1">
          <div className="ml-1 align-self-center">
            <div className="d-flex align-self-center my-1">
              <div className="d-flex align-items-center">
                <div>
                  <Mail />
                </div>
                <span className="ml-1">{email}</span>
              </div>
            </div>
            <div className="d-flex align-self-center my-1">
              <div className="d-flex align-items-center">
                <div>
                  <FileText />
                </div>

                <span className="ml-1">{ktp}</span>
              </div>
            </div>
            <div className="d-flex align-self-center my-1">
              <div className="d-flex align-items-center">
                <div>
                  <Phone />
                </div>

                <span className="ml-1">{phone}</span>
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter className="">
          <div className="d-flex justify-content-between">
            <div className="justify-content-start align-self-center">
              <BadgePill progress={progress} />
            </div>
            <div className="">
              <button
                className="btn btn-link font-weight-bold btn-sm"
                onClick={() => router.push(`/candidateList/detail/${id}`)}
              >
                <strong>See More</strong>
              </button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CandidateListCard;
