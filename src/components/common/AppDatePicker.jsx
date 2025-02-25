import React, { useState } from 'react';
import { FormControl, FormLabel, Input, IconButton } from "@mui/joy";
import DatePicker from "react-datepicker";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import "react-datepicker/dist/react-datepicker.css";

const AppDatePicker = ({ label, size, placeholder, name, date, minDate , handleChange , zIndex }) => {
  // const [startDate, setStartDate] = useState(null);

  return (
    <FormControl size={size || "lg"} sx={{zIndex: zIndex || 999}}>
      <FormLabel>{label}</FormLabel>
      <DatePicker
        // showIcon
        selected={date}
        minDate={minDate}
        onChange={(selectedDate) => handleChange(selectedDate, name)}
        placeholderText={placeholder}
        // icon={<CalendarTodayIcon />}
        name={name}
        customInput={
          <Input
            size={size || "lg"}
            placeholder={placeholder || "Choose a date"}
            sx={{ height: size === "lg" ? '48px' : '28px' }}

          />
        }
      />

    </FormControl>
  );
};

export default AppDatePicker;
