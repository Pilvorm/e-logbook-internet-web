import { Card, Form } from "reactstrap";

const CustomCommentLog = ({ children, cardTitle, onSubmitForm }) => {
  return (
    <div className="d-flex">
      <div className="mr-1">
        <div className="d-flex" style={{ width: "3rem", height: "1rem" }}></div>
      </div>
      <div className="w-100">
        <div style={{ height: "0.02rem" }}></div>
        <div className="my-1"></div>
        <Card className="p-4">
          <div className="content-header mb-2">
            <h5 className="mb-0">{cardTitle}</h5>
          </div>
          <Form onSubmit={onSubmitForm}>{children}</Form>
        </Card>
      </div>
    </div>
  );
};

export default CustomCommentLog;
