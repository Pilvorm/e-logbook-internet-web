import ReactPaginate from "react-paginate";
import { Row, Col } from "reactstrap";

const Pagination = ({ totalPage, pageNumber, handlePagination }) => {
  return (
    <Row>
      <Col
        className="d-flex align-items-center justify-content-start mt-1"
        md="9"
        sm="12"
      >
        <p className="mb-0" style={{ color: "#b9b9c3" }}>
          Showing 1 to 10 of 29 entries
        </p>
      </Col>
      <Col>
        <ReactPaginate
          pageCount={totalPage || 1}
          nextLabel=""
          breakLabel="..."
          previousLabel=""
          activeClassName="active"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          forcePage={pageNumber - 1}
          onPageChange={(page) => handlePagination(page)}
          pageClassName={"page-item"}
          nextLinkClassName={"page-link"}
          nextClassName={"page-item next"}
          previousClassName={"page-item prev"}
          previousLinkClassName={"page-link"}
          pageLinkClassName={"page-link"}
          containerClassName={
            "pagination react-paginate justify-content-end p-1"
          }
        />
      </Col>
    </Row>
  );
};

export default Pagination;
