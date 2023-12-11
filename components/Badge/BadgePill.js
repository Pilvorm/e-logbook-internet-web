import React from "react";
import { Badge } from "reactstrap";

export const BadgePill = ({ progress }) => {
  let badgeColor = "";
  if (progress === "FDD" || progress === "PSYCHOTEST" || progress === "Join") {
    badgeColor = "light-primary";
  } else if (progress === "Interview HRD" || progress === "Interview User") {
    badgeColor = "light-warning";
  } else if (progress === "MCU") {
    badgeColor = "light-info";
  } else if (progress === "Not Join") {
    badgeColor = "light-danger";
  } else if (progress === "Training") {
    badgeColor = "light-primary";
  }

  return (
    <Badge color={badgeColor} pill>
      {progress}
    </Badge>
  );
};

export default BadgePill;
