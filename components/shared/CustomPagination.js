import ReactPaginate from "react-paginate";
import { Row, Col } from "reactstrap";

const Pagination = ({
  handlePagination,
  totalData,
  currentPage,
  pageSize,
  totalPage,
}) => {
  return (
    <Row className="mx-0 mb-2 w-100 d-flex justify-content-between">
      <Col
        className="d-flex align-items-center justify-content-center justify-content-md-end mt-1"
        md="3"
      >
        <p className="mb-0" style={{ color: "#b9b9c3" }}>
          Showing {(currentPage - 1) * pageSize + 1} to{" "}
          {totalData - currentPage * pageSize > 0
            ? currentPage * pageSize
            : totalData}{" "}
          of {totalData} entries
        </p>
      </Col>
      <Col
        className="d-flex align-items-center justify-content-center mt-1"
        md="3"
        //   sm="12"
      >
        <ReactPaginate
          pageCount={totalPage}
          onPageChange={(page) => handlePagination(page)}
          forcePage={currentPage - 1}
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
  );
};

export default Pagination;
