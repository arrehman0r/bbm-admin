import React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

const FormSelect = ({ label, options, onChange, name, error }) => {
  return (
    <FormControl size="sm" error={error}>
      <FormLabel>{label}</FormLabel>
      <Select
        size="sm"
        placeholder="Select"
        onChange={(_, newValue) => onChange({ target: { name, value: newValue } })}

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