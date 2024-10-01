import React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { IconButton } from "@mui/joy";

const FormSelect = ({ label, options = [], onChange, name, error, placeholder, startDecorator, size, defaultOption, multiple }) => {
  // Check if options is an array of objects with id and name
  const isObjectArray = options.length > 0 && typeof options[0] === 'object' && options[0].hasOwnProperty('id') && options[0].hasOwnProperty('name');
  
  // Determine default value
  const defaultValue = isObjectArray && typeof defaultOption === 'object' 
    ? defaultOption._id 
    : defaultOption;

  return (
    <FormControl size={size || "sm"} error={error}>
      <FormLabel>{label}</FormLabel>
      <Select
        size={size || "sm"}
        multiple ={multiple}
        placeholder={placeholder || "Select"}
        onChange={(_, newValue) =>
          onChange({ target: { name, value: newValue } })
        }
        startDecorator={startDecorator && <IconButton>{startDecorator}</IconButton>}
        defaultValue={defaultValue}
      >
        {options.map((option, index) => (
          <Option
            key={isObjectArray ? option.id : index} 
            value={isObjectArray ? option.id : option}
          >
            {isObjectArray ? option.name : option}
          </Option>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormSelect;
