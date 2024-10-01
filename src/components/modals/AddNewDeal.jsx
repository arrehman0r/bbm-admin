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
import AppDatePicker from "../common/AppDatePicker";
import DateRangeIcon from '@mui/icons-material/DateRange';
const AddNewDealModal = ({ open, setOpen, handleInputChange, dates, fileName, handleAddUser, handleDateChange, handleFileChange, allServices }) => {


    return (


        <Modal open={open} onClose={() => setOpen(false)} >
            <ModalDialog sx={{ width: 500 }}>
                <ModalClose />
                <Typography id="filter-modal" level="h2">
                    Add New Deal
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <InputField
                        label="Deal Name"
                        name="dealName"
                        placeholder="Staff Name"
                        onChange={handleInputChange}
                    />
                    <FormSelect
                        label="Deal Type"
                        name="type"
                        multiple={true}
                        options={["Combo Deal", "Simple Deal"]}
                        onChange={handleInputChange}
                    />

                    <InputField
                        label="Discounted Value"
                        name="discountValue"
                        placeholder="Enter Discounted Price"
                        onChange={handleInputChange}
                        maxLength={2}
                        type="number"
                    />

                    <AppDatePicker
                        size="sm"
                        startDecorator={<DateRangeIcon />}
                        placeholder="Start Date"
                        name="startDate"
                        date={dates?.startDate}
                        handleChange={handleDateChange}
                        minDate={new Date()}
                    />
                    <AppDatePicker
                        size="sm"
                        startDecorator={<DateRangeIcon />}
                        placeholder="End Date"
                        name="endDate"
                        date={dates?.endDate}
                        handleChange={handleDateChange}
                        minDate={new Date()}
                    />
                    <InputField
                        label="Issue Count"
                        name="minimumOrder"
                        placeholder="How many customers can avail this deal"
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
                        multiple={true}
                        options={allServices.map((c) => ({ id: c._id, name: c.name }))}
                        onChange={handleInputChange}
                    />

                    <AppTextArea
                        label="Description"
                        name="description"
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
                    <AppButton text="Add Deal" onClick={handleAddUser} />

                </Sheet>
            </ModalDialog>
        </Modal>
    )
}


export default AddNewDealModal