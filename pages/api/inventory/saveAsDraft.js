import axios from "axios";
import { INVENTORY_URL } from "constant";
import { getHeaders } from "helpers/utils";

export default async function saveAsDraft(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }

    const headers = req.headers;
    const body = req.body;

    const utilHeaders = getHeaders(headers["appauthorization"]);

    const cstmHeaders = {
      "CSTM-COMPID": headers["cstm-compid"] ? headers["cstm-compid"] : "",
      "CSTM-ROLE": headers["cstm-role"] ? headers["cstm-role"] : "",
      "CSTM-UPN": headers["cstm-upn"] ? headers["cstm-upn"] : "",
      "CSTM-NAME": headers["cstm-name"] ? headers["cstm-name"] : "",
      "CSTM-EMAIL": headers["cstm-email"] ? headers["cstm-email"] : "",
    };

    const response = await axios({
      url: `${INVENTORY_URL}/Inventory/SaveAsDraft`,
      method: "POST",
      headers: {
        ...utilHeaders,
        ...cstmHeaders
      },
      data: body,
    });

    if (response.status >= 200) {
      res.status(200).json({ success: true, data: response.data });
    } else if (response.status == 401) {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with an error status code
      const errorData = error.response.data;
      // const errorMessage = errorData.message;

      // Send the error message as a response to the client
      res
        .status(error.response.status)
        .json({ success: false, message: errorData });
    } else if (error.request) {
      // The request was made, but no response was received (network error)
      res.status(500).json({ message: "Network error" });
    } else {
      // Something happened in setting up the request that triggered an error
      res.status(500).json({ message: "Request error" });
    }
  }
}
