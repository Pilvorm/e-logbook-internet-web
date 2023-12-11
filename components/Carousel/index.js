import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Button } from "reactstrap";

const CarouselComponent = ({ child, width }) => {
  return (
    <div>
      <Carousel
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        // showArrows
        // width={width && 1200}
        // infiniteLoop
        renderArrowPrev={(clickHandler, hasPrev) => {
          if (hasPrev) {
            return (
              <div
                onClick={clickHandler}
                style={{
                  fontSize: 30,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                  left: 0,
                  top: 0,
                  bottom: 0,
                  height: "100%",
                }}
              >
                {"<"}
              </div>
            );
          }
        }}
        renderArrowNext={(clickHandler, hasNext) => {
          if (hasNext) {
            return (
              <div
                onClick={clickHandler}
                style={{
                  fontSize: 30,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  height: "100%",
                }}
              >
                {">"}
              </div>
            );
          }
        }}
      >
        {child.map((item) => (
          <div style={{ width: "90%", margin: "auto" }}>{item}</div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
