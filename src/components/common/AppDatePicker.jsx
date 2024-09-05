import React, { useState } from 'react';
import { FormControl, FormLabel, Input, IconButton } from "@mui/joy";
import DatePicker from "react-datepicker";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import "react-datepicker/dist/react-datepicker.css";

const AppDatePicker = ({ label, size, placeholder, startDecorator }) => {
  const [startDate, setStartDate] = useState(null);

  return (
    <FormControl size={size || "lg"}>

      <DatePicker
      showIcon
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText = {placeholder}
        icon = {<CalendarTodayIcon/>}
        customInput={
          <Input
          // sx={{}}
            size={size || "lg"}
            placeholder={placeholder || "Choose a date"}
            sx={{ height: "48px"}} 
          />
        }
      />

    </FormControl>
  );
};

export default AppDatePicker;
