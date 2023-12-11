import React, { useState, useEffect, useRef } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import classNames from "classnames";
import Proptypes from "prop-types";
import { FormGroup, Input } from "reactstrap";
import { Range, getTrackBackground } from "react-range";

const WrapperCustomScrollbar = (props) => {
  const [isSelectable, setIsSelectable] = useState(true);
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollClientWidth, setScrollClientWidth] = useState(0);
  const [scrollWith, setScrollWith] = useState("");
  const [maxWidthScroll, setMaxWidthScroll] = useState(110);
  const STEP = 0.1;
  const MIN = 0;
  const MAX = maxWidthScroll;
  const { heightScroll, showHorizontalScroll = true } = props;

  const scrollbars = useRef();

  const [init, setInit] = useState(false);

  useEffect(() => {
    const values = scrollbars.current.getValues();
    if (values?.scrollHeight > values?.clientHeight) setIsScrollable(true);
  }, [init]);

  useEffect(() => {
    setInit(true);
  }, [scrollbars]);

  return (
    <React.Fragment>
      <div
        className=""
        style={{
          height: heightScroll ? heightScroll - 20 : 380,
          overflow: "hidden",
        }}
      >
        <Scrollbars
          ref={scrollbars}
          hideTracksWhenNotNeeded={false}
          onScrollStart={() => setIsSelectable(false)}
          onScrollStop={() => setIsSelectable(true)}
          onScroll={(value) => {}}
          onScrollFrame={(value) => {
            setScrollWith("frame");
            if (scrollWith == "frame") {
              const currentPosition =
                ((value.clientWidth + value.scrollLeft) / value.scrollWidth) *
                100;
              setScrollClientWidth(value.clientWidth);
              setScrollPosition(value.clientWidth + value.scrollLeft);
            }
          }}
          onUpdate={(value) => {
            console.log(value);
            if (scrollWith.length == 0) {
              const currentPosition =
                ((value.clientWidth + value.scrollLeft) / value.scrollWidth) *
                100;
              setMaxWidthScroll(value.scrollWidth);
              setScrollClientWidth(value.clientWidth);
              setScrollPosition(value.clientWidth + value.scrollLeft);
            }
          }}
          autoHide={false}
          autoHideTimeout={0}
          disableHorizontalScrolling={true}
          autoHideDuration={200}
          // high={heightScroll}
          // height={heightScroll}
          // heightScroll={heightScroll}
          autoHeight
          autoHeightMin={heightScroll ?? 400}
          autoHeightMax={heightScroll ?? 400}
          thumbMinSize={30}
          universal={true}
          renderView={({ style, ...props }) => {
            const viewStyle = { ...props.style, overflowX: "hidden" };

            return (
              <div
                className={classNames("", {
                  "pr-4": isScrollable,
                })}
                style={{ ...style, ...viewStyle }}
                {...props}
              />
            );
          }}
        >
          <div
            className={classNames("", {
              "pointer-events-none": !isSelectable,
            })}
          >
            {props.children}
          </div>
        </Scrollbars>
      </div>
      {showHorizontalScroll && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            margin: "0em",
          }}
        >
          <Range
            values={[scrollPosition]}
            step={STEP}
            min={MIN}
            max={MAX}
            onChange={(value) => {
              setScrollWith("pointer");
              if (value[0] >= scrollClientWidth && scrollWith == "pointer") {
                setScrollPosition(value[0]);
                scrollbars.current.scrollLeft(value[0] - scrollClientWidth);
              }
            }}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: "36px",
                  display: "flex",
                  width: "100%",
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: "5px",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                      values: [scrollPosition],
                      colors: ["rgb(2, 221, 10)", "#ccc"],
                      min: MIN,
                      max: MAX,
                    }),
                    alignSelf: "center",
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "14px",
                  width: "14px",
                  borderRadius: "4px",
                  backgroundColor: "rgb(2, 221, 10)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0px 2px 6px #AAA",
                  borderRadius: "30px",
                }}
              ></div>
            )}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default WrapperCustomScrollbar;
