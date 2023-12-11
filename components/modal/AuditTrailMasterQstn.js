import { HTTP_CODE } from "constant";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table,
} from "reactstrap";
import { Users } from "react-feather";
import { createMasterCity, editMasterCity } from "redux/actions/master/city";
import * as yup from "yup";

const AuditTrailMasterQstn = ({
  visible,
  toggle,
  data,
  lastSalary,
  lastAllowance,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const HistoryJobDetail = ({ gajiTerakhir, tunjanganTerakhir }) => (
    <div className="row">
      <div className="col-sm">
        <div className=" d-flex flex-column my-2 ml-5">
          <p>Gaji Pokok terakhir yang diterima</p>
          <h4 className="font-weight-bold">
            <strong>{gajiTerakhir}</strong>
          </h4>
        </div>
      </div>

      <div className="col-sm">
        <div className=" d-flex flex-column my-2">
          <p>Tunjangan/Fasilitas terakhir yang diterima</p>
          <h4 className="font-weight-bold">
            <strong>{tunjanganTerakhir}</strong>
          </h4>
        </div>
      </div>
    </div>
  );

  console.log(data);

  return (
    <Modal isOpen={visible} className="modal-lg" toggle={toggle}>
      <ModalHeader className="text-secondary bg-light" toggle={toggle}>
        <div className="d-flex mt-2">
          {/* <Users /> */}
          <h3 className="ml-1">
            <strong>Audit Trail</strong>
          </h3>
        </div>
      </ModalHeader>

      <>
        <ModalBody>
          <Table responsive className="border">
            <thead>
              <tr>
                <th className="text-center align-middle">NO</th>
                <th className="text-center align-middle">CreatedBy</th>
                <th className="text-center align-middle">Created Date</th>
                <th className="text-center align-middle">Type</th>
                <th className="text-center align-middle">Field Name</th>
                <th className="text-center align-middle">Old Value</th>
                <th className="text-center align-middle">New Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">1</td>
                <td className="text-center">
                  {/* {singleData?.companyName ?? ""} */}
                  asd
                </td>
                <td className="text-center">
                  {/* {singleData?.posisition ?? ""} */}
                  asd
                </td>
                <td className="text-center">
                  ads
                  {/* {singleData?.status ?? ""} */}
                </td>
                <td className="text-center">
                  {/* {singleData?.yearStart ?? ""} */}
                  asd
                </td>
                <td className="text-center">
                  asd
                  {/* {singleData?.yearEnd ?? ""} */}
                </td>
                <td className="text-center">
                  asd
                  {/* {singleData?.yearEnd ?? ""} */}
                </td>
              </tr>{" "}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </>
    </Modal>
  );
};

export default AuditTrailMasterQstn;
