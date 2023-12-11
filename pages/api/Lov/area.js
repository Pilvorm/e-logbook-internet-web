import axios from "axios";
import { API_MASTER } from "constant";
import { getHeaders } from "helpers/utils";

export default async function getLovArea(req, res) {
  try {
    const headers = req.headers;
    const body = req.body;

    const utilHeaders = getHeaders(headers["appauthorization"]);

    const compCode = headers["x-compcode"];

    const response = await axios({
      url: `${API_MASTER}/api/MasterArea`,
      method: "GET",
      headers: {
        ...utilHeaders,
        "X-PAGINATION": true,
        "X-FILTER": `status=Active|companyCode=${compCode}`,
        "X-PAGESIZE": 100,
      },
    });

    if (response.status == 200) {
      res.status(200).json({ success: true, data: response.data });
    } else if (response.status == 401) {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
}
