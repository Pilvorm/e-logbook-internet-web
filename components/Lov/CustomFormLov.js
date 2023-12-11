import axios from "axios";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";

const CustomLov = ({
  changeHandler,
  options,
  selected,
  setSelected,
  objectValue,
  chooseFieldForLabel,
  disabled,
  id,
}) => {
  const onChangeHandler = (value) => {
    if (objectValue === true) {
      const label = JSON.parse(value)[chooseFieldForLabel];
      setSelected({
        label: label,
        value: value,
      });
    } else {
      setSelected({
        label: value,
        value: value,
      });
    }
    changeHandler(value);
  };

  return (
    <ReactSelect
      classNamePrefix="select"
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      type="select"
      id={id}
      placeholder=""
      value={selected}
      autoFocus
      className={`w-100`}
      onChange={(e) => onChangeHandler(e.value)}
      options={options}
      isDisabled={disabled}
    ></ReactSelect>
  );
};

export default CustomLov;
