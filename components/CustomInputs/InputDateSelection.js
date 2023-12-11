import React, { useState } from "react";
import { FormGroup, Label } from "reactstrap";
import DatePicker from "react-datepicker";

function InputDateSelection({ isBold, label, name, showPlaceholder = true }) {
  const [dateStartOpen, setDateStartOpen] = useState(false);
  const [startDate, setStartDate] = useState("");

  return (
    <React.Fragment>
      <FormGroup className="mx-0 px-0 col-12">
        {label && !isBold && <Label for={name}>{label}</Label>}
        {label && isBold && (
          <span className="font-weight-bold" for={name}>{label}</span>
        )}
        <DatePicker
          open={dateStartOpen}
          onInputClick={() => setDateStartOpen(!dateStartOpen)}
          onClickOutside={() => setDateStartOpen(true)}
          placeholderText={showPlaceholder ? "Select..." : ""}
          dateFormat="dd-MMM-y"
          className={`form-control datepicker-table2`}
          selected={startDate ? new Date(startDate) : false}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          onChange={(e) => {
            setStartDate(moment(e).format("YYYY-MM-DD").toString());
            setDateStartOpen(false);
            setValueDate(moment(e).format("YYYY-MM-DD"));
          }}
        />
      </FormGroup>
    </React.Fragment>
  );
}

export default InputDateSelection;
