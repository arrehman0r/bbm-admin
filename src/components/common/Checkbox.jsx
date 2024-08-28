import Checkbox from "@mui/joy/Checkbox";

const FormCheckBox = ({ label, size, defaultChecked, mt }) => {
  return (
    <Checkbox
      label={label}
      size={size || "sm"}
      defaultChecked={defaultChecked}
      sx={{ 
        ".css-egebz-JoyCheckbox-checkbox": {
          backgroundColor: "#581E47",
        
        },
      }}
    />
  );
};

export default FormCheckBox;
