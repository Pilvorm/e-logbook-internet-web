import React from "react";
import NumberFormat from "react-number-format";

const NumberFormatSeparator = ({amount}) => {
  return (
    <div>
      <NumberFormat
        thousandsGroupStyle="thousand"
        value={amount}
        decimalSeparator="."
        displayType="text"
        type="text"
        thousandSeparator={true}
        allowNegative={true} 
        suffix={`${amount==1 ? ' day' : ' days'}`}
        />
    </div>
  );
};
export default NumberFormatSeparator;