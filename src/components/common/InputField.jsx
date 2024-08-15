import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';

export default function InputField({ label, placeholder, helpertext, error, onChange, ...props }) {
  return (
    <FormControl size="sm">
      <FormLabel>{label}</FormLabel>
      <Input placeholder={placeholder} onChange={onChange} {...props} error={error} />
      {helpertext && <FormHelperText>{helpertext}</FormHelperText>}
    </FormControl>)
}