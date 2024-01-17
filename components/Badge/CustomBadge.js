import { Badge } from "reactstrap";

const PROGRESS_COLOR = {
  WARNING: "light-warning",
  INFO: "light-info",
  SUCCESS: "light-success",
  DANGER: "light-danger",
  LIGHT: "light"
};

export const CustomBadge = ({ type, content }) => {
  return (
    <Badge color={PROGRESS_COLOR[type.toUpperCase()] || "light-primary"}>
      {content}
    </Badge>
  );
};
