import React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { IconButton } from "@mui/joy";
const FormSelect = ({ label, options, onChange, name, error, placeholder, startDecorator ,size }) => {
  return (
    <FormControl size={size ||"sm"} error={error}>
      <FormLabel>{label}</FormLabel>
      <Select
        size={size ||"sm"}
        placeholder={placeholder || "Select"}
        onChange={(_, newValue) =>
          onChange({ target: { name, value: newValue } })
        }
        startDecorator={startDecorator && <IconButton>{startDecorator}</IconButton>}
      >
        {options?.map((option, index) => (
          <Option key={index} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormSelect;
