import ReactPaginate from "react-paginate";
import { Col, Row, Label, Input, CustomInput, Table } from "reactstrap";

const DataTable = ({ columns, data, renderRowActions, state }) => {
  return (
    <div>
      <Row className="mx-0 mb-2">
        <Col
          className="d-flex align-items-center justify-content-start mt-1"
          md="10"
          sm="12"
        >
          <Label className="mr-1" for="rows-per-page">
            Show
          </Label>
          <CustomInput
            type="select"
            id="rows-per-page"
            className="custominput-table2"
            value={state.pageSize}
            onChange={state.onPageSizeChange}
          >
            {state.pageSizeOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </CustomInput>
        </Col>
        <Col
          className="d-flex align-items-center justify-content-end mt-1"
          md="2"
          sm="12"
        >
          <Input
            className="search-table2"
            type="text"
            name="search"
            id="search-invoice"
            placeholder="Search"
            value={state.searchQuery}
            onKeyPress={state.onSearchKeyPress}
            onChange={state.onSearchChange}
          />
        </Col>
      </Row>

      <Table responsive className="border">
        <thead className="text-center">
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.Header}</th>
            ))}
            {renderRowActions && <th></th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id || index}>
              {columns.map((col, i) => (
                <td key={Math.floor(Math.random() * 100000).toString()}>
                  {col.Cell ? <col.Cell row={row} /> : row[col.accessor]}
                </td>
              ))}
              {renderRowActions && <td>{renderRowActions(row)}</td>}
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
            Showing 1 to {state.pageSize} to of {state.totalData} entries
          </p>
        </Col>
        <Col
          className="d-flex align-items-center justify-content-end mt-1"
          md="3"
          sm="12"
        >
          <ReactPaginate
            onPageChange={state.onPageChange}
            forcePage={state.pageNumber - 1}
            pageCount={state.totalPage || 1}
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
    </div>
  );
};

export default DataTable;
