import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Textarea from '@mui/joy/Textarea';


const AppTextArea=({label, placeholder,onChange,  name,  ...props})=>  {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Textarea placeholder={placeholder || "Write your text here"} minRows={3}  name={name}     {...props}
        onChange={onChange}  />
      {/* <FormHelperText>Write your text here.</FormHelperText> */}
    </FormControl>
  );
}
export default AppTextArea