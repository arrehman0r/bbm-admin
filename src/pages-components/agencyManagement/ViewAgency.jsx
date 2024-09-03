import React, { useState, useEffect, useCallback } from "react";
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
import { getTravelAgency } from "../../server/api";
import AppButton from "../../components/common/AppButton";

import { useSelector } from "react-redux";

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
        <MenuItem>Edit</MenuItem>
        <MenuItem>Deactivate</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function ViewAgency() {
  const [order, setOrder] = useState("desc");
  const [selected, setSelected] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [open, setOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
 
  // useEffect(() => {
  //   setCountries(Country.getAllCountries());
  // }, []);
  const fetchAgencies = async () => {
       try {
      const res = await getTravelAgency();
      setAgencies(res);
      console.log("res of agencies", res);
    }

    catch (error) {
      console.log("error ---", error)
    }
  };

  useEffect(() => {
    fetchAgencies();
  }, []);

  const handleInputChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      if (name === "country") {
        const selectedCountry = countries.find((c) => c.name === value);
        if (selectedCountry) {
          setCities(
            City.getCitiesOfCountry(selectedCountry.isoCode).map(
              (city) => city.name
            )
          );
        } else {
          setCities([]);
        }
      }
    },
    [countries]
  );

  const renderFilters = () => (
    <React.Fragment>
      {/* <FormSelect 
        label="Agency Type" 
        name="agencyType" 
        options={["Type1", "Type2"]} 
      />
      
      <FormSelect 
        label="Status" 
        name="status" 
        options={["Active", "Inactive"]} 
      />
      
        <FormSelect 
        label="Agency Category" 
        name="agencyCategory" 
        options={["Category1", "Category2"]} 
      /> */}

      <InputField label="Code" name="code" placeholder="Code" />

      <InputField label="Email ID" name="email" placeholder="Email ID" />

      <InputField
        label="Agency Name"
        name="agencyName"
        placeholder="Agency Name"
      />
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
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
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
          <FormLabel>Search for Agency</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
        {renderFilters()}
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
                  Agency Name
                </Link>
              </th>
              <th>Status</th>
              <th>Available Limit</th>
              <th>Country</th>
              <th>Code</th>
              <th>Agency Type</th>
              <th>AR Code</th>
              <th />
            </tr>
          </thead>
          {agencies.length > 0 && (
            <tbody>
              {stableSort(agencies, getComparator(order, "agencyName")).map(
                (row) => (
                  <tr key={row.agencyName}>
                    <td>
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
                    </td>
                    <td>{row.personName}</td>
                    <td>Active</td>
                    <td>{row?.availableLimit}</td>
                    <td>{row.country}</td>
                    <td>{row.groupArCode}</td>
                    <td>{row.agencyType}</td>
                    <td>{row.arCode}</td>
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
    </React.Fragment>
  );
}
