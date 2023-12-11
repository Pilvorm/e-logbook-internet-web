import React, { useEffect } from "react";
import { X } from "react-feather";
import WrapperCustomScrollbar from "components/custom/WrapperCustomScrollbar";
import axios from "axios";
import { useState } from "react";
import { API_COMMENT_URL } from "constant";

const ViewComments = () => {
  const [comments, setComments] = useState();
  const getAllComments = () => {
    var data = JSON.stringify({
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      systemCode: "Kpartner",
      moduleCode: "Bid Response",
      docNo: "2022/05/CPRO-BR/00008",
      comment: "string",
      createdByUpn: "string",
      createdByName: "string",
      createdDate: "string",
      updatedByUpn: "string",
      updatedByName: "string",
      updatedDate: "string",
      tipe: "string",
    });

    var config = {
      method: "get",
      url: API_COMMENT_URL,
      headers: {
        "X-FILTER":
          "systemCode=Kpartner|moduleCode=Bid Response|documentNumber=2022/05/CPRO-BR/00008",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setComments(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllComments();
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <div
        style={{ top: -300 }}
        className="bg-white position-absolute rounded col-12 col-md-12 p-0 m-0"
      >
        <div
          style={{ height: 28, width: 28, top: -14, right: -14 }}
          className="bg-white rounded d-flex justify-content-center align-items-center position-absolute"
        >
          <X className="text-muted" size={18} />
        </div>
        <div className="w-100 d-flex justify-content-start py-1 px-2 bg-success rounded">
          <span className="text-white">Comment Logs</span>
        </div>
        <div
          style={{ height: 460 }}
          className="d-flex flex-column justify-content-start pl-2 pb-2 pt-2"
        >
          <WrapperCustomScrollbar showHorizontalScroll={false}>
            <div className="row px-1 border-bottom mb-2">
              {/* <div className="col-2">
                <Avatar
                  img="/images/portrait/small/avatar-s-11.jpg"
                  imgHeight="40"
                  imgWidth="40"
                  status="online"
                />
              </div> */}
              <div className="pl-1 d-flex flex-column justify-content-start align-items-start col-12">
                <div className="">
                  <small className="font-weight-bold">Chad Alexander</small>
                </div>
                <div className="">
                  <small className="">May 24, 2020</small>
                </div>
                <div className="mt-1">
                  <p style={{ fontSize: 12 }} className="text-left">
                    A variation on the question technique above, the
                    multiple-choice question great way to engage your reader.
                  </p>
                </div>
              </div>
            </div>
            <div className="row px-1 border-bottom mb-2">
              {/* <div className="col-2">
                <Avatar
                  img="/images/portrait/small/avatar-s-11.jpg"
                  imgHeight="40"
                  imgWidth="40"
                  status="online"
                />
              </div> */}
              <div className="pl-1 d-flex flex-column justify-content-start align-items-start col-12">
                <div className="">
                  <small className="font-weight-bold">Chad Alexander</small>
                </div>
                <div className="">
                  <small className="">May 24, 2020</small>
                </div>
                <div className="mt-1">
                  <p style={{ fontSize: 12 }} className="text-left">
                    A variation on the question technique above, the
                    multiple-choice question great way to engage your reader.
                  </p>
                </div>
              </div>
            </div>
            <div className="row px-1 border-bottom mb-2">
              {/* <div className="col-2">
                <Avatar
                  img="/images/portrait/small/avatar-s-11.jpg"
                  imgHeight="40"
                  imgWidth="40"
                  status="online"
                />
              </div> */}
              <div className="pl-1 d-flex flex-column justify-content-start align-items-start col-12">
                <div className="">
                  <small className="font-weight-bold">Chad Alexander</small>
                </div>
                <div className="">
                  <small className="">May 24, 2020</small>
                </div>
                <div className="mt-1">
                  <p style={{ fontSize: 12 }} className="text-left">
                    A variation on the question technique above, the
                    multiple-choice question great way to engage your reader.
                  </p>
                </div>
              </div>
            </div>
            <div className="row px-1 border-bottom mb-2">
              {/* <div className="col-2">
                <Avatar
                  img="/images/portrait/small/avatar-s-11.jpg"
                  imgHeight="40"
                  imgWidth="40"
                  status="online"
                />
              </div> */}
              <div className="pl-1 d-flex flex-column justify-content-start align-items-start col-12">
                <div className="">
                  <small className="font-weight-bold">Chad Alexander</small>
                </div>
                <div className="">
                  <small className="">May 24, 2020</small>
                </div>
                <div className="mt-1">
                  <p style={{ fontSize: 12 }} className="text-left">
                    A variation on the question technique above, the
                    multiple-choice question great way to engage your reader.
                  </p>
                </div>
              </div>
            </div>
            <div className="row px-1 border-bottom mb-2">
              {/* <div className="col-2">
                <Avatar
                  img="/images/portrait/small/avatar-s-11.jpg"
                  imgHeight="40"
                  imgWidth="40"
                  status="online"
                />
              </div> */}
              <div className="pl-1 d-flex flex-column justify-content-start align-items-start col-12">
                <div className="">
                  <small className="font-weight-bold">Chad Alexander</small>
                </div>
                <div className="">
                  <small className="">May 24, 2020</small>
                </div>
                <div className="mt-1">
                  <p style={{ fontSize: 12 }} className="text-left">
                    A variation on the question technique above, the
                    multiple-choice question great way to engage your reader.
                  </p>
                </div>
              </div>
            </div>
          </WrapperCustomScrollbar>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ViewComments;
