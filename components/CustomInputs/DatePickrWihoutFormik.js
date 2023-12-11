import React, { useState } from "react";
import moment from "moment";
import { Calendar } from "react-feather";
import Flatpickr from "react-flatpickr";
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from "reactstrap";

const DatePickrWihoutFormik = ({
  label,
  isBold,
  disabled,
  readOnly,
  backgroundWhite,
  defaultValue: initialDate,
  onChange: externalOnChange,
  ...props
}) => {
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const [selectedDate, setSelectedDate] = useState(
    initialDate ? moment(initialDate).toDate() : null
  );

  const handleDateChange = (selectedDates) => {
    const selectedMoment = moment(selectedDates[0]);
    setSelectedDate(selectedMoment.toDate());

    if (externalOnChange) {
      externalOnChange(selectedMoment.format("YYYY-MM-DD"));
    }
  };
  const flatpickrOptions = {
    dateFormat: "d M Y",
  };

  if (!initialDate) {
    flatpickrOptions.minDate = currentDate;
  }

  return (
    <Flatpickr
      id={props.name}
      options={flatpickrOptions}
      value={selectedDate}
      onChange={handleDateChange}
      render={({ defaultValue, value, ...props }, ref) => {
        return (
          <InputGroup className="input-group-merge">
            <Input
              style={{
                backgroundColor: backgroundWhite ? "white" : "#efefef",
              }}
              {...props}
              innerRef={ref}
              disabled={disabled}
              readOnly={readOnly}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText>
                <Calendar size={15} />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        );
      }}
    />
  );
};

export default DatePickrWihoutFormik;
