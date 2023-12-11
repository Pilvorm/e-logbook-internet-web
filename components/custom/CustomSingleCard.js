import { Card } from "reactstrap";

const CustomSingleCard = ({ children }) => {
  return (
    <div className="d-flex">
      <div className="w-100">
        <div className="my-2 mx-2">
          <Card className="p-4">{children}</Card>
        </div>
      </div>
    </div>
  );
};

export default CustomSingleCard;
