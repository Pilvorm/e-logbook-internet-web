import React, { useRef } from "react";
import Uppy from "@uppy/core";
import { XHRUpload } from "uppy";
import { Button } from "reactstrap";

function UploadFileUppy({ btnName, onChange }) {
  const fileUploadRef = useRef(null);

  const handleUpload = () => { 
    fileUploadRef.current.click();
  };

  return (
    <React.Fragment>
      <input
        ref={fileUploadRef}
        accept=".pdf, .png, .jpg, .jpeg"
        style={{ display: "none" }}
        multiple
        name="uppyResult"
        type="file"
        onClick={(event) => {
          event.target.value = null;
        }}
        onChange={(e) => {
          onChange();
          // const fileData = e.target.files[0];

          // const uppyInstance = new Uppy({
          //   id: "fileUpload",
          //   restrictions: { maxNumberOfFiles: 1 },
          //   autoProceed: true,
          // })
          //   .use(XHRUpload, {
          //     endpoint: `${API_FILES_STAGING_URL}/single?applicationCode=KPARTNER&ModuleCode=EC-ContractApproval`,
          //     headers: getFileUploadHeaders(),
          //   })
          //   .on("file-added", (file) => {
          //     setLoadingUpload(true);
          //   })
          //   .on("upload-success", (file, response) => {
          //     setDataPrintOut(response.body);
          //     saveContractApproval(sessionData, newData, response.body)
          //       .then((response) => {
          //         if (response) {
          //           updateData();
          //           showSuccessNotification("Successed save file contract");
          //           setLoadingUpload(false);
          //         } else {
          //           setLoadingUpload(false);
          //         }
          //       })
          //       .catch((error) => {
          //         errorNotification(error.message.toString());
          //         setLoadingUpload(false);
          //       });
          //   });

          // uppyInstance.addFile({
          //   name: fileData.name,
          //   type: fileData.type,
          //   data: fileData,
          //   source: "Local",
          //   isRemote: false,
          // });

          // uppyInstance.upload().then((result) => {
          //   if (result.failed.length > 0) {
          //     result.failed.forEach((file) => {
          //       console.error(file.error);
          //     });
          //   }
          // });
        }}
      />
      <Button.Ripple
        onClick={() => handleUpload()}
        color="success"
        className="col-12"
      >
        {btnName}
      </Button.Ripple>
    </React.Fragment>
  );
}

export default UploadFileUppy;
