// import axios from "axios";
// import moment from "moment";
// import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { Spinner, Table } from "reactstrap";
// import { getAuditTrailQuestion } from "redux/actions/master/question-list";

// const AuditTable = ({ id }) => {
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [imageStates, setImageStates] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     setLoading(true);
//     dispatch(getAuditTrailQuestion(id)).then(async (res) => {
//       setList(res);
//       setLoading(false);
//     });
//   }, []);

//   if (loading) {
//     return <Spinner />;
//   }

//   const fetchImageData = async (id) => {
//     try {
//       // Make an HTTP GET request using axios with the extracted ID
//       const response = await axios.get(
//         `http://file-development-kf-asd-apiglobal-dev.apps.alpha.kalbe.co.id/api/Files/${id}/downloadBase64`
//       );

//       // Save the image data in the component state
//       setImageStates((prevImageStates) => [
//         ...prevImageStates,
//         { id, imageData: response.data },
//       ]);
//     } catch (error) {
//       // Handle any errors that occur during the HTTP request
//       console.error("Error fetching image data:", error);
//     }
//   };

//   // console.log(JSON.stringify(list.listAuditTrail));
//   console.log(imageStates);

//   return (
//     <Table responsive className="border">
//       <thead>
//         <tr>
//           <th className="text-center align-middle">NO</th>
//           <th className="text-center align-middle">Created By</th>
//           <th className="text-center align-middle">Created Date</th>
//           <th className="text-center align-middle">Type</th>
//           <th className="text-center align-middle">Field Name</th>
//           <th className="text-center align-middle">Old Value</th>
//           <th className="text-center align-middle">New Value</th>
//         </tr>
//       </thead>
//       <tbody>
//         {list?.listAuditTrail?.length > 0 &&
//           list?.listAuditTrail?.map((data, index) => {
//             const includesImage = data?.changingFields?.includes("Image");

//             // Check if the image state is available in the component's state
//             const oldImageState = imageStates.find(
//               (state) => state.id === data?.json_OldData
//             );
//             const newImageState = imageStates.find(
//               (state) => state.id === data?.json_NewData
//             );

//             // Fetch image data if 'includesImage' is true and the image state is not available
//             if (includesImage && !oldImageState) {
//               fetchImageData(data?.json_OldData);
//             }
//             if (includesImage && !newImageState) {
//               fetchImageData(data?.json_NewData);
//             }

//             // console.log(imageStates, "IMAGE");

//             return (
//               <tr>
//                 <td className="text-center">{index + 1}</td>
//                 <td className="text-center">{data?.createdBy ?? ""}</td>
//                 <td className="text-center">
//                   {data?.createdDate
//                     ? moment(data.createdDate).format("DD MMM YYYY")
//                     : ""}
//                 </td>
//                 <td className="text-center">{data?.action ?? ""}</td>
//                 <td className="text-center">{data?.changingFields ?? ""}</td>
//                 <td className="text-center">{data?.json_OldData ?? ""}</td>
//                 <td className="text-center">{data?.json_NewData ?? ""}</td>
//               </tr>
//             );
//           })}
//       </tbody>
//     </Table>
//   );
// };

// export default AuditTable;

import axios from "axios";
import { API_FILE } from "constant";
import { getHeaders } from "helpers/utils";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Spinner, Table } from "reactstrap";
import { getAuditTrailQuestion } from "redux/actions/master/question-list";

const AuditTable = ({ id }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageStates, setImageStates] = useState([]);
  const dispatch = useDispatch();

  const removeHTMLTags = (htmlString) => {
    const regex = /(<([^>]+)>)/gi;
    return htmlString.replace(regex, "");
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getAuditTrailQuestion(id)).then(async (res) => {
      setList(res);
      setLoading(false);
    });
  }, [id, dispatch]);

  if (loading) {
    return <Spinner />;
  }

  const fetchImageData = async (id) => {
    try {
      // Make an HTTP GET request using axios with the extracted ID
      const response = await axios.get(
        `${API_FILE}/api/Files/${id}/downloadBase64`,{
          headers: getHeaders()
        }
      );

      // Save the image data in the component state
      setImageStates((prevImageStates) => [
        ...prevImageStates,
        { id, imageData: response.data },
      ]);
    } catch (error) {
      // Handle any errors that occur during the HTTP request
      console.error("Error fetching image data:", error);
      // Save null in the component state to indicate no image is available
      setImageStates((prevImageStates) => [
        ...prevImageStates,
        { id, imageData: null },
      ]);
    }
  };


  return (
    <Table responsive className="border">
      <thead>
        <tr>
          <th className="text-center align-middle">NO</th>
          <th className="text-center align-middle">Created By</th>
          <th className="text-center align-middle">Created Date</th>
          <th className="text-center align-middle">Type</th>
          <th className="text-center align-middle">Field Name</th>
          <th className="text-center align-middle">Old Value</th>
          <th className="text-center align-middle">New Value</th>
        </tr>
      </thead>
      <tbody>
        {list?.listAuditTrail?.length > 0 &&
          list?.listAuditTrail?.map((data, index) => {
            const includesImage = data?.changingFields?.includes("Image");


            // Check if the image state is available in the component's state
            const oldImageState = imageStates.find(
              (state) => state.id === data?.json_OldData
            );
            const newImageState = imageStates.find(
              (state) => state.id === data?.json_NewData
            );

            // Fetch image data if 'includesImage' is true and the image state is not available
            if (includesImage && !oldImageState) {
              fetchImageData(data?.json_OldData);
            }
            if (includesImage && !newImageState) {
              fetchImageData(data?.json_NewData);
            }

            // console.log(imageStates, "IMAGE");

            return (
              <tr key={index}>
                {/* Your table cell data */}
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{data?.createdBy ?? ""}</td>
                <td className="text-center">
                  {data?.createdDate
                    ? moment(data.createdDate).format("DD MMM YYYY")
                    : ""}
                </td>
                <td className="text-center">{data?.action ?? ""}</td>
                <td className="text-center">{data?.changingFields ?? ""}</td>
                <td className="text-center">
                  {oldImageState && oldImageState.imageData ? (
                    <img
                      src={`data:image/png;base64,${oldImageState.imageData}`}
                      alt="Old Image"
                      style={{ width: "100px", height: "100px" }}
                    />
                  ) : (
                    // data?.json_OldData ?? ""
                    removeHTMLTags(data?.json_OldData ?? "")
                  )}
                </td>
                <td className="text-center">
                  {newImageState && newImageState.imageData ? (
                    <img
                      src={`data:image/png;base64,${newImageState.imageData}`}
                      alt="New Image"
                      style={{ width: "100px", height: "100px" }}
                    />
                  ) : (
                    // data?.json_NewData ?? ""
                    removeHTMLTags(data?.json_NewData ?? "")
                  )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default AuditTable;
