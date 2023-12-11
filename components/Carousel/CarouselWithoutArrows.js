import React from "react";
import { Carousel } from "react-responsive-carousel";

const CarrouselWithoutArrow = ({ child }) => {
  return (
    <div>
      <Carousel
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        renderArrowPrev={(clickHandler, hasPrev) => {
          return (
            <div
              className={`${
                true ? "absolute" : "hidden"
              } top-0 bottom-0 right-0 flex justify-center opacity-30 hover:opacity-100 cursor-pointer z-20 p-1`}
            >
              <p
                style={{
                  fontSize: 30,
                  position: "absolute",
                  zIndex: 2,
                  left: 10,
                  top: "50%",
                  bottom: "50%",
                }}
              >
              </p>
            </div>
          );
        }}
        renderArrowNext={(clickHandler, hasNext) => {
          return (
            <div
              className={`${
                true ? "absolute" : "hidden"
              } top-0 bottom-0 right-0 flex justify-center opacity-30 hover:opacity-100 cursor-pointer z-20 p-1`}
            >
              {/* <RightIcon className="w-9 h-9 text-white" /> */}
              <p
                style={{
                  fontSize: 30,
                  position: "absolute",
                  zIndex: 2,
                  right: 10,
                  top: "50%",
                  bottom: "50%",
                }}
              >
                {/* {">"} */}
              </p>
            </div>
          );
        }}
      >
        {child.map((item) => (
          <div style={{ width: "90%", margin: "auto" }}>{item}</div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarrouselWithoutArrow;
