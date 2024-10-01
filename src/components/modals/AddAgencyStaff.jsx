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
const AddAgencyUserModal = ({ open, setOpen, handleInputChange, fileName, handleAddUser, handleFileChange, allServices }) => {
  return (


    <Modal open={open} onClose={() => setOpen(false)} >
      <ModalDialog sx={{ width: 500 }}>
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
          <InputField
            label="Phone Number"
            name="staffphone"
            placeholder="Staff Phone Number"
            onChange={handleInputChange}
            maxLength={2}
            type="number"
          />
          <InputField
            label="Email"
            name="staffEmail"
            placeholder="Staff Email"
            onChange={handleInputChange}
            maxLength={2}
            type="email"
          />
          {/* <Typography level="title-sm" component='label' endDecorator={<Checkbox sx={{ ml: 12 }} name="editPermission" onChange={(e) =>
            handleInputChange({
              target: { name: e.target.name, value: e.target.checked },
            })
          } />}>
            Staff Can Edit
          </Typography> */}
          {/* <FormSelect
            label="Select Agency"
            name="selectedAgency"
            options={allAgencies.map((role) => ({ id: role._id, name: role.agencyName }))}
            onChange={handleInputChange}
          /> */}


          <FormSelect
            label="Select Service"
            name="service"
            options={allServices.map((c) => ({ id: c._id, name: c.name }))}
            onChange={handleInputChange}
          />

          <AppTextArea
            label="Staff Bio"
            name="bio"
            onChange={handleInputChange}
          // error={errors.address}
          />
          <AppButton
            text={fileName || "Upload Staff Image"}
            type="file"
            variant="outlined"
            color="#fff"
            bgColor="#A67E85"
            onChange={handleFileChange}
            component="label"

          />
          <AppButton text="Add Staff" onClick={handleAddUser} />

        </Sheet>
      </ModalDialog>
    </Modal>
  )
}


export default AddAgencyUserModal