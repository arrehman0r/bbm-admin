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
} from "../../server/api";
import AppButton from "../../components/common/AppButton";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/reducer/loaderSlice";
import { passwordRegex } from "../../components/utils";
import AddAgencyUserModal from "../../components/modals/AddAgencyStaff";
import EditAgencyStaffModal from "../../components/modals/EditAgencyStaff";

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
  const [allAgencies, setAllAgencies] = useState([]);
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
      const res = await getTravelAgency(page);
      setAllAgencies(res.result.agency);

      console.log("res of agencies", res);
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
          <MenuItem onClick={() => handleAgencyUserStatus(userId, status)}>
            {status === "INACTIVE" ? "ACTIVE" : "INACTIVE"}
          </MenuItem>
          <MenuItem onClick={() => handleEditStaff(staff)}>EDIT</MenuItem>
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
      if (userData?.agency_id && userData.role !== "super_admin") {
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
    const { userCnic, userEmail, userName, role, password, selectedAgency } = userManagementRef.current;
    console.log("we are checking all ", userCnic, userEmail, userName, role, password)
    // Validate email
    if (!userEmail || !/^[\w-\.]+@(gmail\.com|[\w-]+\.asaam\.pk)$/.test(userEmail)) {
      enqueueSnackbar("Please enter a valid email address.");
      return;
    }

    // Validate CNIC
    if (!userCnic || !/^\d{13}$/.test(userCnic)) {
      enqueueSnackbar("Please enter a valid CNIC (13 digits).");
      return;
    }

    // Validate CNIC
    if (!password || !passwordRegex.test(password)) {
      enqueueSnackbar("Please enter a valid password.");
      return;
    }

    // Check for role
    if (!role) {
      enqueueSnackbar("Please enter staff role");
      return;
    }
    if (!selectedAgency) {
      enqueueSnackbar("Please select agency");
      return;
    }

    // Validate user name length
    if (!userName) {
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
      agencyId: selectedAgency || userData?.agency_id
    };

    try {
      dispatch(setLoading(true));
      const res = await addAgencyUser(body);
      if (res.result) {
        throw new Error('Network response was not ok');
    }

      if (res.result) {
        enqueueSnackbar("User added successfully.", { variant: "success" });
        setOpen(false);
        fetchAgencyUsers();
      } else {
        enqueueSnackbar(res.message || "Failed to add user.", { variant: "error" }); // Show server error message if available
      }
    } catch (res) {
      console.log(res, "user adding error/...")
     

    } finally {
      dispatch(setLoading(false));
    }
  };



  const handleAddStaff = () => {
    fetchAgencies(1);
    setOpen(true)
  }

  const renderFilters = () => (
    <React.Fragment>
      <InputField type="number" label="CNIC" name="cnic" placeholder="CNIC Number" onChange={handleSearchInputChange} />

      <InputField type="email" label="Email ID" name="staffEmail" placeholder="Email ID" onChange={handleSearchInputChange} />

      <InputField label="Staff Name" name="StaffName" placeholder="Satff Name" onChange={handleSearchInputChange} />
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
            text="Add Staff"

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
                  Staff Name
                  {/* </Link> */}
                </th>
                <th style={{ textAlign: 'center' }}>Staff Email</th>
                <th style={{ textAlign: 'center' }}>Agency Name</th>

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
                      <td>{row?.agencyId.agencyName}</td>

                      <td>{row.role}</td>
                      <td>{row.status}</td>

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


      <AddAgencyUserModal open={open} setOpen={setOpen} handleInputChange={handleInputChange} usersRoles={usersRoles} handleAddUser={handleAddUser} allAgencies={allAgencies} />
      <EditAgencyStaffModal handleStaffChange={handleStaffChange} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} allAgencies={allAgencies} usersRoles={usersRoles} handleSaveEdit={handleSaveEdit} editStaff={editStaff} />
    </Box>
  );
}
