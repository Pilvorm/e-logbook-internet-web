import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Timmery = ({
  remainingTime,
}) => {
  const router = useRouter();

  useEffect(() => {
    let redirectTimeout;

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, [remainingTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
      <>
        <span className="time-value">{minutes}</span>
        <span className="time-unit">Menit</span>{" "}
        <span className="time-value">{seconds}</span>
        <span className="time-unit">Detik</span>
      </>
    );
  };

  const formattedTime = formatTime(remainingTime);

  // Display the component only if remainingTime is less than or equal to 60 seconds
  return  (
    <div className="time-remaining text-[red]">
      <div
        className={`time-value-wrapper text-red cartoon-effect mt-1`}
      >
        {formattedTime}
      </div>
    </div>
  )
};

export default Timmery;