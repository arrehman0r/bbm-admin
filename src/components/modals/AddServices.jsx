import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import FormSelect from "../common/FormSelect";
import InputField from "../common/InputField";
import AppButton from "../common/AppButton";
import Checkbox from '@mui/joy/Checkbox';
import Typography from '@mui/joy/Typography';
import Sheet from "@mui/joy/Sheet";
import Divider from "@mui/joy/Divider";
import AppTextArea from "../common/AppTextArea";

const AddServicesModal = ({ open, setOpen, handleInputChange, handleAddServices, handleFileChange, file, fileName, setFileName }) => {
    return (
        <Modal open={open} onClose={() => setOpen(false)} >
            <ModalDialog sx={{ width: 500 }}>
                <ModalClose />
                <Typography id="service-modal" level="h2">
                    Add Service
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <InputField
                        label="Service Name"
                        name="serviceName"
                        placeholder="Service Name"
                        onChange={handleInputChange}
                    />
                    <AppTextArea
                        label="Service Description"
                        name="description"
                        placeholder="Enter a brief description of the service"
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Service Price"
                        name="servicePrice"
                        placeholder="Enter service price"
                        onChange={handleInputChange}
                        type="number"
                    />



                    <Typography level="body-sm" component="label">
                        <Checkbox
                            name="isDeal"
                            onChange={(e) =>
                                handleInputChange({
                                    target: { name: e.target.name, value: e.target.checked },
                                })
                            }
                            label="Is this a Deal"
                        />

                    </Typography>

                    <Typography level="body-sm" component="label">
                        <Checkbox
                            name="featured"
                            onChange={(e) =>
                                handleInputChange({
                                    target: { name: e.target.name, value: e.target.checked },
                                })
                            }
                            label="Feature Service"
                        />

                    </Typography>
                    <AppButton
                        text={fileName || "Upload File"}
                        type="file"
                        variant="outlined"
                        color="#fff"
                        bgColor="#A67E85"
                        onChange={handleFileChange}
                        component="label"

                    />
                    <AppButton text="Add Service" onClick={handleAddServices} />
                </Sheet>
            </ModalDialog>
        </Modal>
    )
}

export default AddServicesModal;
