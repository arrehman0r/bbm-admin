import Checkbox from "@mui/joy/Checkbox";

const FormCheckBox = ({ label, size, defaultChecked, mt }) => {
  return (
    <Checkbox
      label={label}
      size={size || "sm"}
      defaultChecked={defaultChecked}
      sx={{ 
        ".css-egebz-JoyCheckbox-checkbox": {
          backgroundColor: "#A67E85",
        
        },
      }}
    />
  );
};

export default FormCheckBox;
