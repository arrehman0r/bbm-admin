import Checkbox from '@mui/joy/Checkbox';

const FormCheckBox = ({label, size}) => {
    return(
        <Checkbox label={label} size={size || "sm"} defaultChecked />
    )

}

export default FormCheckBox;