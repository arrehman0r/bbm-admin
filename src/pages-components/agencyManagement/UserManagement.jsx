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
} from "../../server/api";
import AppButton from "../../components/common/AppButton";
import { useSnackbar } from "notistack";
import ConfirmDeleteUser from "../../components/modals/ConfirmDeleteUser";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/reducer/loaderSlice";

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
  const userData = useSelector((state) => state.user.loginUser)
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
    } catch (error) {}
  };
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

  const fetchAgencyUsers = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getAgencyUsers(userData?.id);
      console.log("users data=-----------------", res);
      if (res.body) {
        setAgencies(res.body);
        dispatch(setLoading(false));
      } else {
        setAgencies([]);
        dispatch(setLoading(false));
        enqueueSnackbar("Error in fetching users.", { variant: "error" });
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log("error in fetching users", error);
      enqueueSnackbar("Error in fetching users.", { variant: "error" });
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchAgencyUsers();

    console.log("agencis fetched");
  }, []);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    userManagementRef.current[name] = value;
  }, []);

  const handleAddUser = async () => {
    const body = {
      firstName: userManagementRef.current.userName,
      email: userManagementRef.current.userEmail,
      password: userManagementRef.current.password,
      role: userManagementRef.current.role,
      agencyId: userData?.id
    };
    try {
      dispatch(setLoading(true));
      const res = await addAgencyUser(body);
      console.log("add user response", res);
      if (res.body?._id) {
        dispatch(setLoading(true));
        enqueueSnackbar("User added successfully.", { variant: "success" });
        setOpen(false);
        fetchAgencyUsers();
      }
    } catch (error) {
      dispatch(setLoading(true));
      enqueueSnackbar("Error in adding user.", { variant: "error" });
    } finally {
      dispatch(setLoading(true));
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
      <InputField label="Code" name="code" placeholder="Code" />

      <InputField label="Email ID" name="email" placeholder="Email ID" />

      <InputField label="User Name" name="userName" placeholder="User Name" />
    </React.Fragment>
  );

  return (
    <React.Fragment>
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
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog>
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Add User
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <InputField
                label="User Name"
                name="userName"
                placeholder="User Name"
                onChange={handleInputChange}
              />
              <FormSelect
                label="Select Role"
                name="role"
                options={usersRoles.map((role) => role.name)}
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
        sx={{ display: { xs: "none", sm: "flex" }, flexWrap: "wrap", gap: 1.5 }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for User</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
        {renderFilters()}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <div></div>
        <AppButton
          text="Add User"
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
          }}
        >
          <thead>
            <tr>
              <th>
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
              </th>
              <th>
                <Link
                  underline="none"
                  color="primary"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                >
                  User Name
                </Link>
              </th>
              <th>User Email</th>
              <th>Role</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          {agencies.length > 0 && (
            <tbody>
              {stableSort(agencies, getComparator(order, "userName"))?.map(
                (row) => (
                  <tr key={row.agencyName}>
                    <td>
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
                    </td>
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

      <Box
        className="Pagination-laptopUp"
        sx={{ pt: 2, display: { xs: "none", md: "flex" } }}
      >
        <AppButton
          size="sm"
          width="120px"
          text="Previous"
          variant="outlined"
          color="#581E47"
          bgColor="#581E47"
          startDecorator={<KeyboardArrowLeftIcon />}
        />

        <Box sx={{ flex: 1 }} />

        <Box display="flex" gap={1}>
          {["1", "2", "3", "…", "8", "9", "10"].map((page) => (
            <IconButton
              key={page}
              size="sm"
              variant={Number(page) ? "outlined" : "plain"}
              sx={{
                color: "#581E47",
                borderColor: "#581E47",
                borderWidth: 1,
                "&:hover": {
                  backgroundColor: "#581E47",
                  color: "#ffffff",
                  borderColor: "#581E47",
                },
                backgroundColor: "transparent",
              }}
            >
              {page}
            </IconButton>
          ))}
        </Box>

        <Box sx={{ flex: 1 }} />
        <AppButton
          size="sm"
          width="120px"
          text="Next"
          variant="outlined"
          color="#581E47"
          bgColor="#581E47"
          endDecorator={<KeyboardArrowRightIcon />}
        />
      </Box>
      <ConfirmDeleteUser
        openDeleteUser={openDeleteUser}
        setOpenDeleteUser={setOpenDeleteUser}
        handleDeleteAgencyUser={handleDeleteAgencyUser}
      />
    </React.Fragment>
  );
}
