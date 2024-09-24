import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import FormSelect from "../common/FormSelect";
import InputField from "../common/InputField";
import AppButton from "../common/AppButton";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Divider from "@mui/joy/Divider";
const AddAgencyUserModal = ({ open, setOpen, handleInputChange, usersRoles, handleAddUser, allAgencies }) => {
  return (


    <Modal open={open} onClose={() => setOpen(false)} >
      <ModalDialog>
        <ModalClose />
        <Typography id="filter-modal" level="h2">
          Add Staff
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <InputField
            label="Staff Name"
            name="userName"
            placeholder="Staff Name"
            onChange={handleInputChange}
          />
          <FormSelect
            label="Select Agency"
            name="selectedAgency"
            options={allAgencies.map((role) => ({ id: role._id, name: role.personName }))}
            onChange={handleInputChange}
          />
          <FormSelect
            label="Select Role"
            name="role"
            options={usersRoles.map((role) => role.name)}
            onChange={handleInputChange}
          />
          <InputField
            label="CNIC"
            name="userCnic"
            placeholder="Staff CNIC"
            onChange={handleInputChange}
          />
          <InputField
            label="Email Address"
            name="userEmail"
            placeholder="Email Address"
            onChange={handleInputChange}
          />

          <InputField
            label="Password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
          />

          <AppButton text="Add Staff" onClick={handleAddUser} />

        </Sheet>
      </ModalDialog>
    </Modal>
  )
}


export default AddAgencyUserModal