import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  CustomInput,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import { getAllUserProfile } from "redux/actions/userProfile";

const KaryawanPopUp = ({ visible, toggle, values = [], onChecked }) => {
  const [loading, setLoading] = useState(false);

  const pageSizeOptions = [5, 10, 25, 50];
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.userProfileReducer);

  useEffect(() => {
    setLoading(true);
    dispatch(
      getAllUserProfile({ pageNumber, pageSize, searchQuery: "" })
    ).finally(() => {
      setLoading(false);
    });

    return () => {
      setLoading(false);
    };
  }, [pageSize, pageNumber]);

  return (
    <Modal isOpen={visible} toggle={toggle} size="xl">
      <ModalHeader className="text-secondary bg-light" toggle={toggle}>
        List Karyawan
      </ModalHeader>
      <ModalBody>
        <Row className="mx-0 mb-2">
          <Col
            className="d-flex align-items-center justify-content-start mt-1"
            md="8"
            sm="12"
          >
            <Label className="mr-1" for="rows-per-page">
              Show
            </Label>
            <CustomInput
              type="select"
              id="rows-per-page"
              className="custominput-table2"
              value={pageSize}
              onChange={(e) => setPageSize(parseInt(e.target.value))}
            >
              {pageSizeOptions.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </CustomInput>
          </Col>
          <Col
            className="d-flex align-items-center justify-content-end mt-1"
            md="4"
            sm="12"
          >
            <Input
              className="search-table2"
              type="text"
              name="search"
              id="search-karyawan"
              placeholder="Search"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  dispatch(
                    getAllUserProfile({
                      pageNumber,
                      pageSize,
                      searchQuery: e.target.value,
                    })
                  );
                }
              }}
            />
          </Col>
        </Row>

        <div>
          {loading ? (
            <Skeleton height={50} count={pageSize + 1} />
          ) : (
            <>
              <Table responsive className="border">
                <thead className="text-center">
                  <tr>
                    <th></th>
                    <th>NIK</th>
                    <th>NAMA</th>
                    <th>DEPARTEMEN</th>
                    <th>JABATAN</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data.map((row, index) => (
                    <tr key={index}>
                      <td className="text-center">
                        <CustomInput
                          inline
                          type="checkbox"
                          id={`checkbox-${index}`}
                          label=""
                          checked={values.some((item) => item.nik === row.nik)}
                          onChange={(e) =>
                            onChecked(e.target.checked, {
                              ...row,
                              name: row.name,
                              companyName: row.deptName,
                              jabatan: row.jobTtlName,
                            })
                          }
                        />
                      </td>
                      <td className="text-center">{row.nik}</td>
                      <td>{row.name}</td>
                      <td>{row.deptName}</td>
                      <td>{row.jobTtlName}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Row className="mx-0 mb-2">
                <Col
                  className="d-flex align-items-center justify-content-start mt-1"
                  md="9"
                  sm="12"
                >
                  <p className="mb-0" style={{ color: "#b9b9c3" }}>
                    Showing 1 to {pageSize} of {data.totalData} entries
                  </p>
                </Col>
                <Col
                  className="d-flex align-items-center justify-content-end mt-1"
                  md="3"
                  sm="12"
                >
                  <ReactPaginate
                    onPageChange={(page) => {
                      setPageNumber(page.selected + 1);
                    }}
                    forcePage={pageNumber - 1}
                    pageCount={data.totalPage || 1}
                    nextLabel={""}
                    breakLabel={"..."}
                    activeClassName={"active"}
                    pageClassName={"page-item"}
                    previousLabel={""}
                    nextLinkClassName={"page-link"}
                    nextClassName={"page-item next-item"}
                    previousClassName={"page-item prev-item"}
                    previousLinkClassName={"page-link"}
                    pageLinkClassName={"page-link"}
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName={"pagination react-paginate m-0"}
                  />
                </Col>
              </Row>
            </>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default KaryawanPopUp;
