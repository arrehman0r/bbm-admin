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
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

import { Country, City } from "country-state-city";
import InputField from "../../components/common/InputField";
import { addBusinessServices, getAllServices, getAllTaxes, getTravelAgency, searchTravelAgency, searchTravelAgencyByEmail } from "../../server/api";
import AppButton from "../../components/common/AppButton";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/reducer/loaderSlice";
import { useSnackbar } from "notistack";
import AddServicesModal from "../../components/modals/AddServices";

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

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        {/* <MenuItem>Edit</MenuItem> */}
        <MenuItem>Deactivate</MenuItem>
        {/* <MenuItem>Move</MenuItem> */}
        {/* <Divider /> */}
        {/* <MenuItem color="danger">Delete</MenuItem> */}
      </Menu>
    </Dropdown>
  );
}

export default function ViewAgency() {
  const [order, setOrder] = useState("desc");
  const emailRegex = /^[\w-\.]+@(gmail\.com|[\w-]+\.asaam\.pk)$/;
  const [agencies, setAgencies] = useState([]);
  const [open, setOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const userData = useSelector((state) => state.user.loginUser)
  const dispatch = useDispatch();
  const searchAgencyRef = useRef({});
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [openAddServices, setOpenAddServices] = useState(false)
  const userManagementRef = useRef({});

  // console.log("userData ", userData)
  const { enqueueSnackbar } = useSnackbar();
  // useEffect(() => {
  //   setCountries(Country.getAllCountries());
  // }, []);
  const fetchAgencies = async (page) => {
    dispatch(setLoading(true));
    try {
      console.log("this run ", page)
      const res = await getAllServices(userData?.businessId, page);
      setAgencies(res.body.data);
      setTotalPages(res.totalPages);  // Set the total pages
      console.log("res of agencies", res);
    } catch (error) {
      console.log("error ---", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchAgencies(page);  // Fetch agencies for the selected page
  };

  useEffect(() => {
    fetchAgencies(currentPage);

  }, []);


  const handleSearchInputChange = (event) => {
    const { name, value } = event.target;
    searchAgencyRef.current[name] = value;
  }
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    console.log(name, value)
    userManagementRef.current[name] = value;
  }, []);

  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile); // Save the file in state
    setFileName(uploadedFile?.name || ""); // Display file name in the button
  };


  // const handleAgencySearch = async () => {
  //   console.log("earch called", searchAgencyRef.current)
  //   const { cnic, staffEmail, agencyName } = searchAgencyRef.current;

  //   // Validation checks
  //   if (staffEmail && !/^[\w-\.]+@(gmail\.com|[\w-]+\.asaam\.pk)$/.test(staffEmail)) {
  //     enqueueSnackbar("Please enter a valid email address.")
  //     return;
  //   }

  //   if (cnic && !/^\d{13}$/.test(cnic)) {
  //     enqueueSnackbar("Please enter a valid CNIC (13 digits).")

  //     return;
  //   }

  //   if (agencyName && agencyName.length < 5) {
  //     enqueueSnackbar("Agency name should be at least 5 characters long.")
  //     return;
  //   }

  //   // Prepare the search parameters
  //   const searchParams = {
  //     CNIC: cnic,
  //     emailId: staffEmail,
  //     agencyName: agencyName,
  //   };

  //   // Remove empty fields
  //   Object.keys(searchParams).forEach(key => {
  //     if (!searchParams[key]) {
  //       delete searchParams[key];
  //     }
  //   });

  //   // Make the search API call
  //   dispatch(setLoading(true));
  //   try {
  //     const res = await searchTravelAgency(searchParams);
  //     setAgencies(res.result.agency);
  //   } catch (error) {
  //     console.error("Error searching agencies:", error);
  //   } finally {
  //     dispatch(setLoading(false));
  //   }
  // };

  const handleAddServices = async () => {
    const { serviceName, description, servicePrice, isDeal, featured, tax } = userManagementRef.current;
    
    console.log("files are ", serviceName, description, servicePrice, isDeal, featured);
    
    if (!serviceName || !description || !servicePrice) {
      enqueueSnackbar("All fields are required", { variant: "error" });
      return;
    }
  
    // Initialize a new FormData object
    const formData = new FormData();
    formData.append('name', serviceName);
    formData.append('description', description);
    formData.append('price', servicePrice);
    formData.append('availability', true);
    formData.append('featured', featured);
    formData.append('isDeal', isDeal);
    formData.append('tax', tax);
    
    // Append the file (if multiple files, you can loop through and append)
    if (file) {
      formData.append('images', file);
    }
  
    try {
      const res = await addBusinessServices(formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setOpenAddServices(false);
      enqueueSnackbar("Services added successfully");
      fetchAgencies(currentPage);
      console.log("res of service", res);
    } catch (error) {
      enqueueSnackbar(error?.message || "An error occurred", { variant: "error" });
      console.log("error is ", error);
    }
  };
  
  const [taxes, setTaxes] = useState([])
  const fetchAllTaxes = async () => {
    try {
      const res = await getAllTaxes()
      setTaxes(res.data)
    }
    catch (error) {
      enqueueSnackbar(error)
    }
  }


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '700px' }}>
      <Box>
        <Sheet
          className="SearchAndFilters-mobile"
          sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}
        >
          <Input
            size="sm"
            placeholder="Add Services"
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
          sx={{ display: { xs: "none", sm: "flex" }, alignItems: 'end', justifyContent: 'end', flexWrap: "wrap", gap: 1.5 }}
        >
          {/* <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for Agency</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
          />
        </FormControl> */}

          {/* <InputField type="number" label="CNIC / NTN" name="cnic" placeholder="CNIC / NTN" onChange={handleSearchInputChange} />

          <InputField label="Email ID" name="staffEmail" placeholder="Email ID" onChange={handleSearchInputChange} />

          <InputField
            label="Agency Name"
            name="agencyName"
            placeholder="Agency Name"
            onChange={handleSearchInputChange}
          /> */}

          <AppButton text="Add Services" size="sm"
            width="150px"

            color="#fff"
            bgColor="#A67E85"
            onClick={() => [setOpenAddServices(true), fetchAllTaxes()]} />
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
            // minHeight: 0,
            height: "500px"
          }}
        >
          <Table
            aria-labelledby="tableTitle"
            stickyHeader
            hoverRow
            sx={{
              "--TableCell-headBackground": "var(--joy-palette-background-level1)",
              "--Table-headerUnderlineThickness": "1px",
              "--TableRow-hoverBackground": "var(--joy-palette-background-level1)",
              "--TableCell-paddingY": "4px",
              "--TableCell-paddingX": "8px",
              textAlign: "center", // This ensures all content is centered
            }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>Service Name</th>
                <th style={{ textAlign: 'center' }}>Price</th>

                <th style={{ textAlign: 'center' }}>Services Type</th>
                <th style={{ textAlign: 'center' }}>Status</th>

                <th style={{ textAlign: 'center' }}>Actions</th>


              </tr>
            </thead>
            {agencies.length > 0 && (
              <tbody>
                {stableSort(agencies, getComparator(order, "agencyName")).map(
                  (row) => (
                    <tr key={row.agencyName}>
                      {/* <td>
                      <Checkbox
                        size="sm"
                        checked={selected.includes(row.agencyName)}
                        onChange={(event) =>
                          setSelected(
                            event.target.checked
                              ? [...selected, row.agencyName]
                              : selected.filter(
                                (name) => name !== row.agencyName
                              )
                          )
                        }
                      />
                    </td> */}
                      <td>{row.name}</td>

                      <td>${row?.price}</td>
                      <td>Beauty</td>

                      <td>Active</td>
                      <td>
                        <RowMenu />
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
      <AddServicesModal open={openAddServices} taxes={taxes} setOpen={setOpenAddServices} handleFileChange={handleFileChange} file={file} fileName={fileName} setFileName={setFileName} handleAddServices={handleAddServices} handleInputChange={handleInputChange} />
    </Box>
  );
}
