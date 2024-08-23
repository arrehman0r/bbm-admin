import React, {
  useRef,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import Box from "@mui/joy/Box";
import InputField from "../../components/common/InputField";
import FormSelect from "../../components/common/FormSelect";

function FlightBooking() {
  const flightBookingRef = useRef({});
  const [errors, setErrors] = useState({});

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    flightBookingRef.current[name] = value;
  }, []);

  const formFields = [
    {
      component: InputField,
      label: "Trip ID",
      name: "tripID",
      error: errors.tripID,
    },
    {
      component: InputField,
      label: "Booking ID",
      name: "bookingID",
      error: errors.bookingID,
    },
    {
      component: InputField,
      label: "Session ID",
      name: "sessionID",
      error: errors.sessionID,
    },
    {
      component: InputField,
      label: "Payment Transaction ID",
      name: "paymentTransactionID",
      error: errors.paymentTransactionID,
    },
    {
      component: FormSelect,
      label: "Agency Type",
      name: "agencyType",
      error: errors.agencyType,
    },
    {
      component: FormSelect,
      label: "Agency",
      name: "agency",
      error: errors.agency,
      placeholder: "Please enter 3 or more characters",
    },
    {
      component: InputField,
      label: "Supplier Ref/PNR",
      name: "supplierRefPNR",
      error: errors.supplierRefPNR,
    },
    {
      component: InputField,
      label: "Ticket Number",
      name: "ticketNumber",
      error: errors.ticketNumber,
    },
    {
      component: FormSelect,
      label: "Suppliers",
      name: "suppliers",
      error: errors.suppliers,
      placeholder: "All supplier",
    },
    {
      component: InputField,
      label: "Pax Name",
      name: "paxName",
      error: errors.paxName,
    },
    {
      component: InputField,
      label: "Contact No.",
      name: "contactNo",
      error: errors.contactNo,
    },
    {
      component: InputField,
      label: "Email",
      name: "email",
      error: errors.email,
    },
    {
      component: FormSelect,
      label: "Ancillary Booking Status",
      name: "ancillaryBookingStatus",
      error: errors.ancillaryBookingStatus,
    },
    {
      component: FormSelect,
      label: "Booking Status",
      name: "bookingStatus",
      error: errors.bookingStatus,
    },
    {
      component: FormSelect,
      label: "Invoice Status",
      name: "invoiceStatus",
      error: errors.invoiceStatus,
    },
    {
      component: FormSelect,
      label: "Payment Mode",
      name: "paymentMode",
      error: errors.paymentMode,
    },
    {
      component: FormSelect,
      label: "Payment Status",
      name: "paymentStatus",
      error: errors.paymentStatus,
    },
    {
      component: FormSelect,
      label: "Fare Type",
      name: "fareType",
      error: errors.fareType,
    },
    {
      component: FormSelect,
      label: "Date Type",
      name: "dateType",
      error: errors.dateType,
      placeholder: "Booking Date",
    },
    {
      component: InputField,
      label: "From Date",
      name: "fromDate",
      error: errors.fromDate,
      placeholder: "Select Date",
    },
    {
      component: InputField,
      label: "To Date",
      name: "toDate",
      error: errors.toDate,
      placeholder: "Select Date",
    },
    {
      component: InputField,
      label: "Promo Code",
      name: "promoCode",
      error: errors.promoCode,
    },
    {
      component: FormSelect,
      label: "Risk Criteria",
      name: "riskCriteria",
      error: errors.riskCriteria,
    },
    {
      component: FormSelect,
      label: "Assign User",
      name: "assignUser",
      error: errors.assignUser,
      placeholder: "Search",
    },
  ];

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
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
      </Box>
      {console.log(flightBookingRef)}
    </div>
  );
}

export default FlightBooking;
