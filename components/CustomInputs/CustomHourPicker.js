// import { useField } from "formik";
// import moment from "moment";
// import { Fragment } from "react";
// import { Clock } from "react-feather"; // You can use the Clock icon from react-feather instead of Calendar for time selection
// import Flatpickr from "react-flatpickr";
// import {
//   FormGroup,
//   Input,
//   InputGroup,
//   InputGroupAddon,
//   InputGroupText,
//   Label,
// } from "reactstrap";

// export default function CustomHourPicker({ label, isBold, ...props }) {
//   const [field, meta, helpers] = useField(props);

//   const showError = Boolean(meta.touched && meta.error);

//   return (
//     <Fragment>
//       <FormGroup className="mx-0 px-0 col-12">
//         {label && !isBold && (
//           <Label
//             for={props.name}
//             style={{ fontSize: "12px" }}
//             className="font-weight-bold"
//           >
//             {label}
//           </Label>
//         )}
//         {label && isBold && (
//           <span
//             className="font-weight-bold"
//             htmlFor={props.name}
//             style={{ fontSize: "12px" }}
//           >
//             {label}
//           </span>
//         )}
//         <Flatpickr
//           id={props.name}
//           options={{
//             enableTime: true, // Enable time selection
//             noCalendar: true, // Hide the calendar
//             dateFormat: "H:i", // Format to display hours and minutes
//             time_24hr: true, // Display time in 24-hour format
//           }}
//           value={moment(field.value).toDate()}
//           onChange={([date]) => {
//             helpers.setValue(moment(date).format("HH:mm")); // Format the output with date and time
//           }}
//           render={({ defaultValue, value, ...props }, ref) => {
//             return (
//               <InputGroup className="input-group-merge">
//                 <Input {...props} innerRef={ref} />
//                 <InputGroupAddon addonType="append">
//                   <InputGroupText>
//                     <Clock size={15} /> {/* Use the Clock icon */}
//                   </InputGroupText>
//                 </InputGroupAddon>
//               </InputGroup>
//             );
//           }}
//         />
//       </FormGroup>
//     </Fragment>
//   );
// }
import { useField } from "formik";
import moment from "moment";
import { Fragment, useState, useEffect } from "react";
import { Clock } from "react-feather";
import DatePicker from "react-datepicker";
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from "reactstrap";

export default function CustomDatePicker({ label, isBold, ...props }) {
  const [field, meta, helpers] = useField(props);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    // Update the selectedTime state when the field value changes
    if (field.value) {
      setSelectedTime(moment(field.value, "HH:mm").toDate());
    }
  }, [field.value]);

  const showError = Boolean(meta.touched && meta.error);

  return (
    <Fragment>
      <FormGroup className="mx-0 px-0 col-12">
        {label && !isBold && (
          <Label
            for={props.name}
            style={{ fontSize: "12px" }}
            className="font-weight-bold"
          >
            {label}
          </Label>
        )}
        {label && isBold && (
          <span
            className="font-weight-bold"
            htmlFor={props.name}
            style={{ fontSize: "12px" }}
          >
            {label}
          </span>
        )}
        <DatePicker
          selected={selectedTime}
          onChange={(date) => {
            // Check if the date is valid and not null
            if (date && moment.isDate(date)) {
              const formattedTime = moment(date).format("HH:mm");
              helpers.setValue(formattedTime);
              setSelectedTime(date);
            } else {
              helpers.setValue(null);
              setSelectedTime(null);
            }
          }}
          onChangeRaw={(e) => {
            // Update the field value with the raw input
            const inputValue = e.target.value;
            const parsedTime = moment(inputValue, "HH:mm", true);
            if (
              parsedTime.isValid() &&
              parsedTime.hour() >= 0 &&
              parsedTime.hour() <= 23 &&
              parsedTime.minute() >= 0 &&
              parsedTime.minute() <= 59
            ) {
              helpers.setValue(parsedTime.format("HH:mm"));
              setSelectedTime(parsedTime.toDate());
            } else {
              // Clear the field value if the input is not valid
              helpers.setValue(null);
              setSelectedTime(null);
            }
          }}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          dateFormat="HH:mm"
          timeCaption="Time"
          customInput={
            <InputGroup className="input-group-merge">
              <Input value={field.value} readOnly={true} />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <Clock size={15} />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          }
        />
      </FormGroup>
    </Fragment>
  );
}
