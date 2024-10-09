import React, { useState, useEffect, useCallback, useRef } from "react";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import InputField from "../../components/common/InputField";
;
import {
  addAgencyUser,
  getTravelAgency,
  getAgencyUsers,
  getAgencyUserRoles,
  updateAgencyUserStatus,
  getAgencyAllUsers,
  searchAgencySatff,
  searchAgencySatffAdmin,
  updateStaffUser,
  updateAgencyStaff,
  getAllServices,
  addDailyDeal,
  getDailyDeals,
  getAllTaxes,
} from "../../server/api";
import AppButton from "../../components/common/AppButton";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/reducer/loaderSlice";
import { formatDate, passwordRegex } from "../../components/utils";
import AddAgencyUserModal from "../../components/modals/AddAgencyStaff";
import EditAgencyStaffModal from "../../components/modals/EditAgencyStaff";
import AddNewDealModal from "../../components/modals/AddNewDeal";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function ViewDeals() {
  const userManagementRef = useRef({});
  const [order, setOrder] = useState("desc");
  const [agencies, setAgencies] = useState([]);
  const [open, setOpen] = useState(false);
  const [usersRoles, setUsersRoles] = useState([]);
  const [editStaff, setEditStaff] = useState(null); // state to store the staff being edited
  const [openEditModal, setOpenEditModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.loginUser);
  const searchStaffRef = useRef({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allServices, setAllAgencies] = useState([]);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null
  });

  // console.log("selectedServices", selectedServices)
  const [taxes, setTaxes] = useState([])
  const fetchAllTaxes = async () => {

    try {
      const res = await getAllTaxes()
      setTaxes(res.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleServiceInputChange = (event) => {
    const { options } = event.target;
    const selected = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setSelectedServices(selected);
  }
  const handleDateChange = (selectedDate, name) => {
    setDates(prevDates => {
      if (name === "startDate") {
        // If end date exists and is before new start date, reset it
        if (prevDates.endDate && selectedDate > prevDates.endDate) {
          return {
            startDate: selectedDate,
            endDate: null
          };
        }
        return {
          ...prevDates,
          startDate: selectedDate
        };
      } else if (name === "endDate") {
        // Only allow end date if start date is set and end date is after start date
        if (prevDates.startDate && selectedDate >= prevDates.startDate) {
          return {
            ...prevDates,
            endDate: selectedDate
          };
        }
        return prevDates;
      }
      return prevDates;
    });
  };


  // useEffect(() => {
  //   fetchAgencyUserRoles();
  
  // }, []);
  const fetchAgencyUserRoles = async () => {
    try {
      const res = await getAgencyUserRoles();
      console.log("res of roles", res)
      if (res.result.length > 0) {
        setUsersRoles(res.result);
        console.log("Res of user roles::", res);
      }
    } catch (error) { }
  };

  const handleEditStaff = (staff) => {
    setEditStaff(staff); // Set the staff data in the state
    setOpenEditModal(true); // Open the modal for editing
  }


  const handleSearchInputChange = (event) => {
    const { name, value } = event.target;
    searchStaffRef.current[name] = value;
  }
  const fetchAgencies = async (page) => {
    dispatch(setLoading(true));
    try {
      const res = await getAllServices(userData?.businessId);
      setAllAgencies(res.body?.data);

      console.log("res of all services", res);
    } catch (error) {
      console.log("error ---", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  function RowMenu({ userId, status, staff, handleEditStaff }) {
    return (
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{
            root: { variant: "plain", color: "neutral", size: "sm" },
          }}
        >
          <MoreHorizRoundedIcon />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 140 }}>
          {/* <MenuItem>Edit</MenuItem> */}
          {/* <MenuItem onClick={() => handleAgencyUserStatus(userId, status)}>
            {status === "INACTIVE" ? "ACTIVE" : "INACTIVE"}
          </MenuItem> */}
          {/* <MenuItem onClick={() => handleEditStaff(staff)}>EDIT</MenuItem> */}
          {/* <Divider />
          <MenuItem color="danger" onClick={() => openDeleteModal(userId)}>
            Delete
          </MenuItem> */}
        </Menu>
      </Dropdown>
    );
  }

  const handleAgencyUserStatus = async (userId, status) => {
    const userStatus = status === "INACTIVE" ? "ACTIVE" : "INACTIVE";
    console.log("userStatus", userStatus)
    const body = {
      status: userStatus,
    };
    try {
      const res = await updateAgencyUserStatus(userId, body);
      console.log("res of activate user is ", res);
      fetchAgencyUsers();
    } catch (error) {
      console.log("error fetching user status", error);
    }
  };

  const fetchAgencyUsers = async (page = 1) => {
    try {
      dispatch(setLoading(true));
      console.log("fetch agency called", currentPage)
      console.log("user data ;;;;;;;" ,userData?.id )
      let res;
      if (userData?.id) {
        res = await getDailyDeals(userData?.businessId);
        console.log("all deals", res)
      }

      if (res?.body) {
        setAgencies(res.body);
        // console.log("agencies are . >>>", res.result.staff)
        // setTotalPages(res.result.totalPages); 
      }
    } catch (error) {
      // enqueueSnackbar("Error fetching users.", { variant: "error" });
    } finally {
      dispatch(setLoading(false));
    }
  };

  console.log("userManagementRef", userManagementRef)

  const handleInputChange = useCallback((eventOrDate, name) => {
    if (eventOrDate instanceof Date) {
      // Handling date change
      userManagementRef.current[name] = eventOrDate;
    } else {
      const { name, value } = eventOrDate.target;
      userManagementRef.current[name] = value;
    }
  }, []);

  const handleStaffSearch = async () => {
    const { cnic, staffEmail, staffName } = searchStaffRef.current;

    // Validation checks
    if (staffEmail && !/^[\w-\.]+@(gmail\.com|[\w-]+\.asaam\.pk)$/.test(staffEmail)) {
      enqueueSnackbar("Please enter a valid email address.");
      return;
    }

    if (cnic && !/^\d{13}$/.test(cnic)) {
      enqueueSnackbar("Please enter a valid CNIC (13 digits).");
      return;
    }

    if (staffName && staffName.length < 5) {
      enqueueSnackbar("Staff name should be at least 5 characters long.");
      return;
    }

    // Prepare the search parameters
    const searchParams = {
      CNIC: cnic,
      email: staffEmail,
      firstName: staffName,
    };

    // Remove empty fields
    Object.keys(searchParams).forEach(key => {
      if (!searchParams[key]) {
        delete searchParams[key];
      }
    });

    console.log("searchParams:", searchParams); // Check the searchParams

    // Make the search API call
    dispatch(setLoading(true));
    try {
      if (userData?.agency_id) {
        const res = await searchAgencySatff(searchParams, userData?.agency_id);
        setAgencies(res.result.staff);
      }

      if (userData?.role === "super_admin") {
        console.log("search params are===", searchParams)
        const adminRes = await searchAgencySatffAdmin(searchParams);
        console.log("adminRes:", adminRes); // Check the response
        setAgencies(adminRes.result.staff);
      }

    } catch (error) {
      console.error("Error searching agencies:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handlePageChange = (page) => {
    console.log("page number is ", page)
    setCurrentPage(page);
    fetchAgencyUsers(page);
  };

  useEffect(() => {
    fetchAgencyUsers(currentPage);
  }, []);

  const handleAddUser = async () => {
    const { dealName, service, discountValue, description, minimumOrder, type, taxType } = userManagementRef.current;
    console.log("we are checking all ", service);

    // Validate service (role), email, and username length
    if (!service) {
      enqueueSnackbar("Please select staff service.");
      return;
    }
    if (!discountValue) {
      enqueueSnackbar("Please enter discount value.");
      return;
    }
    if (!dealName || dealName.length < 5) {
      enqueueSnackbar("Staff name should be at least 5 characters long.");
      return;
    }

    // Create FormData instance
    const formData = new FormData();
    formData.append('name', dealName);
    formData.append('discountValue', discountValue);
    formData.append('endDate', dates.endDate);
    formData.append('startDate', dates?.startDate);
    formData.append('minimumOrder', minimumOrder);
    service.forEach(serviceId => {
      formData.append('servicesId[]', serviceId);
  });
    formData.append('description', description);
    formData.append('type', type);
    formData.append('tax', taxType);



    if (file) {  // Ensure there's a file selected
      formData.append('images', file);
    }
    formData.append('businessId', userData?.businessId);

    try {
      dispatch(setLoading(true));

      const res = await addDailyDeal(formData); // Pass FormData instead of a plain object


      enqueueSnackbar("Deal added successfully.", { variant: "success" });
      setOpen(false);
      fetchAgencyUsers();

    } catch (error) {
      enqueueSnackbar(error || "Error occurred.", { variant: "error" });
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };


  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    console.log("data ..", uploadedFile)
    setFile(uploadedFile); // Save the file in state
    setFileName(uploadedFile?.name || ""); // Display file name in the button
  };


  const handleAddStaff = () => {
    fetchAgencies(1); 
    fetchAllTaxes()
    setOpen(true)
  }

  const renderFilters = () => (
    <React.Fragment>
      <InputField type="number" label="Deal Name" name="cnic" placeholder="Deal Name" onChange={handleSearchInputChange} />

      {/* <InputField type="email" label="Email ID" name="staffEmail" placeholder="Email ID" onChange={handleSearchInputChange} /> */}

      <InputField label="Service Name" name="Services" placeholder="Service Name" onChange={handleSearchInputChange} />
      <AppButton text="Search" size="sm"
        width="120px"

        onClick={handleStaffSearch}
      />
    </React.Fragment>
  );

  const handleSaveEdit = async () => {
    console.log("editstaff ", editStaff)

    const body = {
      firstName: editStaff.userName,
      email: editStaff?.email,
      role: editStaff?.role,
      CNIC: editStaff?.CNIC
    }
    try {
      const res = await updateAgencyStaff(editStaff._id, body);
      enqueueSnackbar("Staff details updated successfully.", { variant: "success" });
      fetchAgencyUsers(); // Refetch the users to get the updated data
      setOpenEditModal(false); // Close the modal after saving
    } catch (error) {
      enqueueSnackbar("Error updating staff details.", { variant: "error" });
    }
  };

  const handleStaffChange = (e) => {
    setEditStaff({ ...editStaff, [e.target.name]: e.target.value });
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '700px' }}>
      <Box>
        <Sheet
          className="SearchAndFilters-mobile"
          sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}
        >
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
            sx={{ flexGrow: 1 }}
          />
          <IconButton
            size="sm"
            variant="outlined"
            color="neutral"
            onClick={() => setOpen(true)}
          >
            <FilterAltIcon />
          </IconButton>



        </Sheet>

        <Box
          className="SearchAndFilters-tabletUp"
          sx={{ display: { xs: "none", sm: "flex" }, alignItems: 'end', flexWrap: "wrap", gap: 1.5 }}
        >

          {renderFilters()}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <div></div>
          <AppButton
            text="Add Deal"
            width="150px"
            onClick={handleAddStaff}
          />
        </Box>
        <Sheet
          className="OrderTableContainer"
          variant="outlined"
          sx={{
            display: { xs: "none", sm: "initial" },
            width: "100%",
            borderRadius: "sm",
            flexShrink: 1,
            overflow: "auto",
            minHeight: 0,
          }}
        >
          <Table
            aria-labelledby="tableTitle"
            stickyHeader
            hoverRow
            sx={{
              "--TableCell-headBackground":
                "var(--joy-palette-background-level1)",
              "--Table-headerUnderlineThickness": "1px",
              "--TableRow-hoverBackground":
                "var(--joy-palette-background-level1)",
              "--TableCell-paddingY": "4px",
              "--TableCell-paddingX": "8px",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                {/* <th>
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== agencies.length
                  }
                  checked={selected.length === agencies.length}
                  onChange={(event) =>
                    setSelected(
                      event.target.checked ? agencies.map((row) => row.id) : []
                    )
                  }
                />
              </th> */}
                <th style={{ textAlign: 'center' }}>
                  {/* <Link
                  underline="none"
                  color="primary"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                > */}
                  Deal Name
                  {/* </Link> */}
                </th>
                <th style={{ textAlign: 'center' }}>Deal Price</th>
                <th style={{ textAlign: 'center' }}>Deal Ended At</th>

                <th style={{ textAlign: 'center' }}>Services</th>
                <th style={{ textAlign: 'center' }}>Status</th>
                <th />
              </tr>
            </thead>
            {agencies.length > 0 && (

              <tbody>
                {stableSort(agencies, getComparator(order, "userName"))?.map(
                  (row) => (
                    <tr key={row.agencyName}>
                      {/* <td>
                      <Checkbox
                        size="sm"
                        checked={selected.includes(row.userName)}
                        onChange={(event) =>
                          setSelected(
                            event.target.checked
                              ? [...selected, row.userName]
                              : selected.filter((name) => name !== row.userName)
                          )
                        }
                      />
                    </td> */}

                      <td>{row?.name}</td>
                      <td>${row?.finalPrice?.toFixed(1)}</td>

                      <td>{formatDate(row?.endDate)}</td>

                      <td>  {row?.servicesId.map((service) => service.name).join(', ')}</td>
                      <td>{row.isActive == true ? "Active" : "Inactive"}</td>

                      <td>
                        {" "}
                        <RowMenu
                          userId={row._id}
                          status={row.status}
                          staff={row}
                          handleEditStaff={handleEditStaff}
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            )}
          </Table>
        </Sheet>
      </Box>
      {totalPages > 1 &&
        <Box
          className="Pagination-laptopUp"
          sx={{ pt: 2, display: { xs: "none", md: "flex" }, justifyContent: 'center' }}
        >
          <Box display="flex" gap={1}>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <IconButton
                key={page}
                size="sm"
                variant={page === currentPage ? "contained" : "outlined"}
                onClick={() => handlePageChange(page)}
                sx={{
                  color: page === currentPage ? "#ffffff" : "#A67E85",
                  borderColor: "#A67E85",
                  borderWidth: 1,
                  backgroundColor: page === currentPage ? "#A67E85" : "transparent",
                  "&:hover": {
                    backgroundColor: "#A67E85",
                    color: "#ffffff",
                    borderColor: "#A67E85",
                  },
                }}
              >
                {page}
              </IconButton>
            ))}
          </Box>
        </Box>
      }


      <AddNewDealModal handleServiceInputChange={handleServiceInputChange} open={open} taxes={taxes} setOpen={setOpen} dates={dates} handleInputChange={handleInputChange} usersRoles={usersRoles} handleDateChange={handleDateChange} handleAddUser={handleAddUser} allServices={allServices} handleFileChange={handleFileChange} fileName={fileName} />
    </Box>
  );
}
