import Checkbox from "@mui/joy/Checkbox";

const FormCheckBox = ({ label, size }) => {
  return (
    <Checkbox
      label={label}
      size={size || "sm"}
      defaultChecked
      sx={{
        ".css-egebz-JoyCheckbox-checkbox": {
          backgroundColor: "#581E47",
        },
      }}
    />
  );
};

export default FormCheckBox;
