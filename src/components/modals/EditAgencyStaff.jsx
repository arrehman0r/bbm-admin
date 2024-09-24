import { Box } from "@mui/joy";
import Modal from "@mui/joy/Modal";
import InputField from "../common/InputField";
import AppButton from "../common/AppButton";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Divider from "@mui/joy/Divider";
import FormSelect from "../common/FormSelect";
const EditAgencyStaffModal = ({ openEditModal, setOpenEditModal, handleStaffChange, handleSaveEdit, editStaff, allAgencies, usersRoles }) => {

    
    return (


        <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
            <ModalDialog>
                <ModalClose />

                <Typography id="filter-modal" level="h2">Edit Staff</Typography>
                <Divider sx={{ my: 2 }} />
                <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                    <InputField
                        label="Staff Name"
                        name="userName"
                        defaultValue={editStaff?.firstName || ""}
                        onChange={handleStaffChange}
                    />
                    <InputField
                        label="Email"
                        name="email"
                        defaultValue={editStaff?.email || ""}
                        onChange={handleStaffChange}
                    />

                    {/* <FormSelect
                        label="Select Agency"
                        name="selectedAgency"
                        options={allAgencies.map((role) => ({ id: role._id, name: role.agencyName }))}
                        onChange={handleStaffChange}
                        defaultOption={editStaff.agencyId}
                    /> */}
                    <FormSelect
                        label="Select Role"
                        name="role"
                        options={usersRoles.map((role) => role.name)}
                        onChange={handleStaffChange}
                        defaultOption={editStaff?.role}
                    />
                    <InputField
                        label="CNIC"
                        name="userCnic"
                        placeholder="Staff CNIC"
                        defaultValue={editStaff?.CNIC || ""}
                        onChange={handleStaffChange}
                    />

                   

                    <AppButton onClick={handleSaveEdit} text="Save Changes" />
                </Sheet>
            </ModalDialog>
        </Modal>
    )
}


export default EditAgencyStaffModal