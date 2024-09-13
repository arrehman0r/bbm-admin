import React, { useState, useEffect, useCallback, useRef } from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

import { Country, City } from "country-state-city";
import InputField from "../../components/common/InputField";
import FormSelect from "../../components/common/FormSelect";
import {
  addAgencyUser,
  getTravelAgency,
  getAgencyUsers,
  deleteAgencyUser,
  getAgencyUserRoles,
  updateAgencyUserStatus,
  getAgencyAllUsers,
  searchAgencySatff,
  searchAgencySatffAdmin,
} from "../../server/api";
import AppButton from "../../components/common/AppButton";
import { useSnackbar } from "notistack";
import ConfirmDeleteUser from "../../components/modals/ConfirmDeleteUser";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/reducer/loaderSlice";
import { passwordRegex } from "../../components/utils";

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

export default function UserManagement() {
  const userManagementRef = useRef({});
  const [order, setOrder] = useState("desc");
  const [selected, setSelected] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [open, setOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [usersRoles, setUsersRoles] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.loginUser);
  const searchStaffRef = useRef({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAgencyUserRoles();
  }, []);
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

  const handleSearchInputChange = (event) => {
    const { name, value } = event.target;
    searchStaffRef.current[name] = value;
  }

  function RowMenu({ userId, openDeleteModal, status }) {
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
          <MenuItem onClick={() => handleAgencyUserStatus(userId, status)}>
            {status === "INACTIVE" ? "ACTIVE" : "INACTIVE"}
          </MenuItem>
          {/* <MenuItem>Move</MenuItem> */}
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
      let res;
      if (userData?.agency_id) {
        res = await getAgencyUsers(userData?.agency_id, page);
      } else if (userData.role === "super_admin") {
        res = await getAgencyAllUsers(page);
      }

      if (res?.result) {
        setAgencies(res.result.staff);
        console.log("agencies are . >>>", res.result.staff)
        setTotalPages(res.result.totalPages); // Update totalPages based on response
      }
    } catch (error) {
      // enqueueSnackbar("Error fetching users.", { variant: "error" });
    } finally {
      dispatch(setLoading(false));
    }
  };



  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    userManagementRef.current[name] = value;
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
    const { userCnic, userEmail, userName, role, password } = userManagementRef.current;
  console.log("we are checking all ",userCnic, userEmail, userName, role, password)
    // Validate email
    if (!userEmail && !/^[\w-\.]+@(gmail\.com|[\w-]+\.asaam\.pk)$/.test(userEmail)) {
      enqueueSnackbar("Please enter a valid email address.");
      return;
    }
  
    // Validate CNIC
    if (!userCnic && !/^\d{13}$/.test(userCnic)) {
      enqueueSnackbar("Please enter a valid CNIC (13 digits).");
      return;
    }

      // Validate CNIC
      if (!password && !passwordRegex.test(password)) {
        enqueueSnackbar("Please enter a valid password.");
        return;
      }
  
    // Check for role
    if (!role) {
      enqueueSnackbar("Please enter staff role");
      return;
    }
  
    // Validate user name length
    if (!userName ) {
      enqueueSnackbar("Staff name should be at least 5 characters long.");
      return;
    }
  
    // Create request body
    const body = {
      firstName: userName,
      email: userEmail,
      CNIC: userCnic,
      password,  
      role,
      agencyId: userData?.agency_id
    };
  
    try {
      dispatch(setLoading(true));
      const res = await addAgencyUser(body);
     
  
      if (res.result) {
        enqueueSnackbar("User added successfully.", { variant: "success" });
        setOpen(false);
        fetchAgencyUsers();
      } else {
        enqueueSnackbar("Failed to add user.");
      }
    } catch (error) {
      enqueueSnackbar("Error in adding user.", { variant: "error" });
    
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  const handleDeleteAgencyUser = async () => {
    try {
      dispatch(setLoading(true));
      const res = await deleteAgencyUser(userIdToDelete);
      if (res) {
        enqueueSnackbar("User deleted successfully", { variant: "success" });
        fetchAgencyUsers(); // Refresh the list after deletion
        setOpenDeleteUser(false); // Close the modal after deletion
        dispatch(setLoading(false));
        dispatch(setLoading(false));
      }
    } catch (error) {
      enqueueSnackbar("Error deleting user.", { variant: "error" });
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const openDeleteModal = (id) => {
    setUserIdToDelete(id); // Set the ID of the user to be deleted
    setOpenDeleteUser(true); // Open the modal
  };
  const renderFilters = () => (
    <React.Fragment>
      <InputField label="CNIC" name="cnic" placeholder="CNIC Number" onChange={handleSearchInputChange} />

      <InputField label="Email ID" name="staffEmail" placeholder="Email ID" onChange={handleSearchInputChange} />

      <InputField label="Staff Name" name="StaffName" placeholder="Satff Name" onChange={handleSearchInputChange} />
      <AppButton text="Search" size="sm"
        width="120px"
        variant="filled"
        color="#fff"
        bgColor="#581E47"
        onClick={handleStaffSearch}
      />
    </React.Fragment>
  );

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
                <Button color="primary" onClick={handleAddUser}>
                  Submit
                </Button>
              </Sheet>
            </ModalDialog>
          </Modal>
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
            text="Add Staff"
            variant="outlined"
            color="#581E47"
            bgColor="#581E47"
            onClick={() => setOpen(true)}
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
                  User Name
                  {/* </Link> */}
                </th>
                <th style={{ textAlign: 'center' }}>User Email</th>
                <th style={{ textAlign: 'center' }}>Role</th>
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

                      <td>{row.firstName}</td>
                      <td>{row?.email}</td>
                      <td>{row.role}</td>
                      <td>{row.status}</td>
                      <td>
                        {" "}
                        <RowMenu
                          userId={row._id}
                          status={row.status}
                          openDeleteModal={openDeleteModal}
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
                  color: page === currentPage ? "#ffffff" : "#581E47",
                  borderColor: "#581E47",
                  borderWidth: 1,
                  backgroundColor: page === currentPage ? "#581E47" : "transparent",
                  "&:hover": {
                    backgroundColor: "#581E47",
                    color: "#ffffff",
                    borderColor: "#581E47",
                  },
                }}
              >
                {page}
              </IconButton>
            ))}
          </Box>
        </Box>
      }
      <ConfirmDeleteUser
        openDeleteUser={openDeleteUser}
        setOpenDeleteUser={setOpenDeleteUser}
        handleDeleteAgencyUser={handleDeleteAgencyUser}
      />
    </Box>
  );
}
