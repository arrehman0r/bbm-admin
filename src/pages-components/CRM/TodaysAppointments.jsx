import React, { useRef, useCallback, useState, useEffect } from "react";
import Divider from "@mui/joy/Divider";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Table from "@mui/joy/Table";
import Link from "@mui/joy/Link";
import Checkbox from "@mui/joy/Checkbox";
import InputField from "../../components/common/InputField";
import FormSelect from "../../components/common/FormSelect";
import FormCheckBox from "../../components/common/Checkbox";
import AppButton from "../../components/common/AppButton";
import { getAllBookings, getFlightBooking } from "../../server/api";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { formatDate, tConvert } from "../../components/utils";

const TodaysAppointments = () => {
  const flightBookingRef = useRef({});
  const [errors, setErrors] = useState({});
  const agentData = useSelector((state) => state.user.loginUser);
  const [selected, setSelected] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [flightBooking, setFlightBooking]= useState([])
  const agentID = agentData;
  
  const { enqueueSnackbar } = useSnackbar();
  console.log("agentID", agentID);

  
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    flightBookingRef.current[name] = value;
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["tripID", "bookingID"];

    requiredFields.forEach((field) => {
      if (!flightBookingRef.current[field]) {
        newErrors[field] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFlightBookingSearch = async () => {
    if (!validateForm()) {
      enqueueSnackbar("Please fill in all required fields.", {
        variant: "error",
      });
      return;
    }

    const body = {
      // agent_ID: agentID
    };

   
  };

const fetchAllFlightBookings = async()=>{
  try {
    const res = await getAllBookings();
    setFlightBooking(res.result)
    // enqueueSnackbar("Flight Search Successful!", { variant: "success" });
    // Reset form or handle any post-submit actions
  } catch (error) {
    console.error("Error searching appointments:", error);
    enqueueSnackbar("Error searching appointments", { variant: "error" });
  }
}

useEffect(()=>{
  fetchAllFlightBookings()
},[])

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: 'center',
          gap: 2,
        }}
      >
        {formFields.map(
          ({ component: Field, label, name, error, placeholder }, index) => (
            <Box
              key={index}
              sx={{
                flexBasis: "calc(33.333% - 16px)",
                flexGrow: 0,
                flexShrink: 0,
              }}
            >
              <Field
                label={label}
                name={name}
                fullWidth
                onChange={handleInputChange}
                error={error}
                placeholder={placeholder}
              />
            </Box>
          )
        )}
           <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mt: 3,
        }}
      >
        {/* <AppButton
          text="Reset"
          variant="outlined"
          color="#A67E85"
          bgColor="#A67E85"
        /> */}
        <AppButton
          text="Search"
          variant="solid"
          color="#fff"
          bgColor="#A67E85"
          width="120px"
          onClick={handleFlightBookingSearch}
        />
      </Box>
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          mt: 3,
        }}
      >
        <FormCheckBox label="Is Pay at Agency" />
        <FormCheckBox label="Is Import PNR" />
        <FormCheckBox label="Is Promo Code Applied" />
      </Box> */}
   
     

      <Divider sx={{ mt: 3 }} />

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
              <th style={{ textAlign: 'center' }}>Service Name</th>
             
              <th style={{ textAlign: 'center' }}>Service Price</th>
              <th style={{ textAlign: 'center' }}>Date</th>

            
             
              <th style={{ textAlign: 'center' }}>Time</th>
              <th style={{ textAlign: 'center' }}>Status</th>
              <th style={{ textAlign: 'center' }}>Booking Id </th>
            
              <th />
            </tr>
          </thead>
          {flightBooking.length > 0 && (
            <tbody>
              {flightBooking.map(
                (row) => (
                  <tr key={row._id}>
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
                    <td style={{ textAlign: 'center' }}>{row.serviceName}</td>
                    <td style={{ textAlign: 'center' }}>${row?.price}</td>
                    <td style={{ textAlign: 'center' }}>{formatDate(row.slots[0]?.startDate)}</td>
                    <td style={{ textAlign: 'center' }}>{tConvert(row?.slots[0]?.startTime)}</td>
                  
                  
                    <td style={{ textAlign: 'center' }}>{row.customer?.firstName}</td>
                    <td style={{ textAlign: 'center' }}>{row.bookingId}</td>
                    <td>
                    
                      {/* <RowMenu /> */}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          )}
        </Table>
      </Sheet>
    </div>
  );
};

export default TodaysAppointments;



const formFields = [
  {
    component: InputField,
    label: "Customer Name",
    name: "tripID",
    // error: errors.tripID,
  },
  // {
  //   component: InputField,
  //   label: "Booking ID",
  //   name: "bookingID",
  //   error: errors.bookingID,
  // },
  // {
  //   component: InputField,
  //   label: "Session ID",
  //   name: "sessionID",
  //   error: errors.sessionID,
  // },
  // {
  //   component: InputField,
  //   label: "Payment Transaction ID",
  //   name: "paymentTransactionID",
  //   error: errors.paymentTransactionID,
  // },
  // {
  //   component: FormSelect,
  //   label: "Agency Type",
  //   name: "agencyType",
  //   error: errors.agencyType,
  // },
  // {
  //   component: FormSelect,
  //   label: "Agency",
  //   name: "agency",
  //   error: errors.agency,
  //   placeholder: "Please enter 3 or more characters",
  // },
  // {
  //   component: InputField,
  //   label: "Supplier Ref/PNR",
  //   name: "supplierRefPNR",
  //   error: errors.supplierRefPNR,
  // },
  // {
  //   component: InputField,
  //   label: "Ticket Number",
  //   name: "ticketNumber",
  //   error: errors.ticketNumber,
  // },
  // {
  //   component: FormSelect,
  //   label: "Suppliers",
  //   name: "suppliers",
  //   error: errors.suppliers,
  //   placeholder: "All supplier",
  // },
  // {
  //   component: InputField,
  //   label: "Pax Name",
  //   name: "paxName",
  //   error: errors.paxName,
  // },
  // {
  //   component: InputField,
  //   label: "Contact No.",
  //   name: "contactNo",
  //   error: errors.contactNo,
  // },
  {
    component: InputField,
    label: "Booking Id",
    name: "bookingId",
    // error: errors.email,
  },
  // {
  //   component: FormSelect,
  //   label: "Ancillary Booking Status",
  //   name: "ancillaryBookingStatus",
  //   error: errors.ancillaryBookingStatus,
  // },
  // {
  //   component: FormSelect,
  //   label: "Booking Status",
  //   name: "bookingStatus",
  //   error: errors.bookingStatus,
  // },
  // {
  //   component: FormSelect,
  //   label: "Invoice Status",
  //   name: "invoiceStatus",
  //   error: errors.invoiceStatus,
  // },
  // {
  //   component: FormSelect,
  //   label: "Payment Mode",
  //   name: "paymentMode",
  //   error: errors.paymentMode,
  // },
  // {
  //   component: FormSelect,
  //   label: "Payment Status",
  //   name: "paymentStatus",
  //   error: errors.paymentStatus,
  // },
  // {
  //   component: FormSelect,
  //   label: "Fare Type",
  //   name: "fareType",
  //   error: errors.fareType,
  // },
  // {
  //   component: FormSelect,
  //   label: "Date Type",
  //   name: "dateType",
  //   error: errors.dateType,
  //   placeholder: "Booking Date",
  // },
  // {
  //   component: InputField,
  //   label: "From Date",
  //   name: "fromDate",
  //   error: errors.fromDate,
  //   placeholder: "Select Date",
  // },
  // {
  //   component: InputField,
  //   label: "To Date",
  //   name: "toDate",
  //   error: errors.toDate,
  //   placeholder: "Select Date",
  // },
  // {
  //   component: InputField,
  //   label: "Promo Code",
  //   name: "promoCode",
  //   error: errors.promoCode,
  // },
  // {
  //   component: FormSelect,
  //   label: "Risk Criteria",
  //   name: "riskCriteria",
  //   error: errors.riskCriteria,
  // },
  // {
  //   component: FormSelect,
  //   label: "Assign User",
  //   name: "assignUser",
  //   error: errors.assignUser,
  //   placeholder: "Search",
  // },
];
