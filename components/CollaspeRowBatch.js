import { Row, Col } from "reactstrap";

const DetailList = ({ title, value }) => {
  const style = { borderBottom: "2px solid #ebe9f2", marginTop: 5 };

  return (
    <div className="d-flex justify-content-between" style={style}>
      <p className="mr-5 text-left">{title}</p>
      <strong className="ml-5 text-right text-wrap">{value}</strong>
    </div>
  );
};

const CollapsibleDetailList = ({ data }) => {
  return (
    // <Row>
    //   <Col md="6">
    //     {data.map((item, index) => (
    //       <Row key={index} className={index !== 0 ? "mt-2" : ""}>
    //         {item.map((detail) => (
    //           <Col key={detail.title}>
    //             <DetailList title={detail.title} value={detail.value} />
    //           </Col>
    //         ))}
    //       </Row>
    //     ))}
    //   </Col>
    // </Row>

    <div className="d-flex justify-content-center">
      <div className="w-100 text-center mx-2">
        <div>
          {data.map((item, index) => {
            return <DetailList title={item.title} value={item.value} />;
          })}
          {/* {data.kodeJenisPeralatan == "APR" && (
            <Apar style={style} data={data.inventoryDetailApar} />
          )}
          {(data.kodeJenisPeralatan == "SKT" ||
            data.jenisPeralatan == "APD") && (
            <JenisLain
              data={data.inventoryDetailJenis}
              jenisPeralatan={data.jenisPeralatan}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleDetailList;
