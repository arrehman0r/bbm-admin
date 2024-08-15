import React from "react";
import AppTextArea from "../../components/common/AppTextArea";
import InputField from "../../components/common/InputField";
import FormSelect from "../../components/common/FormSelect";
import Box from "@mui/joy/Box";
const ViewAgency = () => {


    return (<div>
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
            }}
        >
            {[
                { component: FormSelect, label: "Agency Type" },
                { component: InputField, label: "Code" },
                { component: InputField, label: "Agency Name" },
                { component: InputField, label: "Contact Person" },
                { component: InputField, label: "Email Id" },
                { component: FormSelect, label: "Status" },
                { component: FormSelect, label: "Entity" },
                { component: FormSelect, label: "Account Manager" },
                { component: FormSelect, label: "Country" },
                { component: FormSelect, label: "City" },
                { component: FormSelect, label: "Agency Category" },
                { component: FormSelect, label: "Registration Date" },

            ].map((field, index) => (
                <Box
                    key={index}
                    sx={{
                        flexBasis: 'calc(33.333% - 16px)',
                        flexGrow: 0,
                        flexShrink: 0,
                    }}
                >
                    <field.component label={field.label} fullWidth />
                </Box>
            ))}

        </Box>
        <AppTextArea label="Address" />

    </div>)

}

export default ViewAgency