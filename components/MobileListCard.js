import { useRouter } from "next/router";
import { Card } from "reactstrap";
import moment from "moment";

const MobileListCard = ({ data, redirectTo }) => {
  const style = { borderBottom: "2px solid #ebe9f2", marginTop: 5 }; //Harus dipindahkan ke file module.css
  const router = useRouter();
  return (
    <Card
      onClick={() => {
        router.push(redirectTo);
      }}
      key={1}
      className="p-1 mt-1 border"
    >
      {data.map((item, index) => {
        return (
          <div className="d-flex justify-content-between" style={style}>
            <p className={`${index == 0 ? "text-primary" : ""}`}>
              {item.label}
            </p>
            <p
              className={`ml-5 mr-2 text-right ${
                index == 0 ? "text-primary" : ""
              }`}
            >
              {item.value}
            </p>
          </div>
        );
      })}
    </Card>
  );
};

export default MobileListCard;
