import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/joy";
import { Country, City } from "country-state-city";
import { useSnackbar } from "notistack";
import InputField from "../../components/common/InputField";
import FormSelect from "../../components/common/FormSelect";
import AppDatePicker from "../../components/common/AppDatePicker";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AlasamLogo from "../../images/alasamLogo.png";
import AppButton from "../../components/common/AppButton";
import BookingFooter from "../../pages-components/BookingEngine/BookingFooter";
import { submitBookingRequest } from "../../server/api";

const Booking = () => {
  const location = useLocation();
  const flight = location.state?.flight;
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [travelers, setTravelers] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setCountries(Country.getAllCountries());
    if (flight) {
      const totalTravelers =
        flight.totalAdults + flight.totalChildren + flight.totalInfants;
      setTravelers(
        Array(totalTravelers)
          .fill()
          .map((_, index) => ({
            type:
              index < flight.totalAdults
                ? "Adult"
                : index < flight.totalAdults + flight.totalChildren
                  ? "Child"
                  : "Infant",
            fullName: "",
            lastName: "",

            country: "",
            city: "",
            phoneNumber: "",
            email: "",
            dob: null,
            passportIssuanceDate: null,
            passportExpiryDate: null,
          }))
      );
    }
  }, [flight]);

  const handleInputChange = (index, field, value) => {
    setTravelers((prevTravelers) => {
      const newTravelers = [...prevTravelers];
      newTravelers[index] = { ...newTravelers[index], [field]: value };
      return newTravelers;
    });

    if (field === "country") {
      const selectedCountry = countries.find((c) => c.name === value);
      if (selectedCountry) {
        console.log("selected cities", cities)
        setCities(
          City.getCitiesOfCountry(selectedCountry.isoCode).map(
            (city) => city.name
          )
        );
      } else {
        setCities([]);
      }
    }
  };

  const handleDateChange = (index, field, date) => {
    setTravelers((prevTravelers) => {
      const newTravelers = [...prevTravelers];
      newTravelers[index] = { ...newTravelers[index], [field]: date };
      return newTravelers;
    });
  };

  const formFields = [
    { component: InputField, label: "CNIC *", name: "cnic" },
    { component: InputField, label: "First Name *", name: "fullName" },
    { component: InputField, label: "Last Name *", name: "lastName" },
    {
      component: FormSelect,
      label: "Place of Birth *",
      name: "country",
      options: countries.map((c) => c.name),
    },
    {
      component: FormSelect,
      label: "Nationality *",
      name: "nationality",
      options: countries.map((c) => c.name),
    },
    { component: FormSelect, label: "City *", name: "city", options: cities },
    {
      component: FormSelect,
      label: "Gender *",
      name: "gender",
      options: ["Male", "Female"],
    },
    {
      component: FormSelect,
      label: "Country Phone Code *",
      name: "countryPhoneCode",
      options: [
        "+1", "+44", "+33", "+34", "+39", "+46", "+971", "+966", "+974", "+965", "+968", "+92", "+91"],
    },
    { component: InputField, label: "Phone *", name: "phoneNumber" },
    { component: InputField, label: "Email *", name: "email" },
    { component: InputField, label: "Passport Number *", name: "passportNumber" },
    {
      component: AppDatePicker,
      name: "dob",
      size: "sm",
      label: "Date of Birth",
    },
    {
      component: AppDatePicker,
      name: "passportIssuanceDate",
      size: "sm",
      label: "Passport Issuance Date",
    },
    {
      component: AppDatePicker,
      name: "passportExpiryDate",
      size: "sm",
      label: "Passport Expiry Date",
    },
    {
      component: FormSelect,
      label: "Passport Issuance Country *",
      name: "passportIssuanceCountry",
      options: countries.map((c) => c.name),
    },
    {
      component: FormSelect,
      label: "Passport Issuance City *",
      name: "passportIssuanceCity",
      options: countries.map((c) => c.name),
    },
  ];




  const renderTravelerForm = (traveler, index) => (
    <Box
      key={index}
      sx={{ mb: 4, p: 2, border: "1px solid #ccc", borderRadius: 2 }}
    >
      <Typography level="h5" sx={{ mb: 2 }}>{`${traveler.type} ${index + 1
        }`}</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {formFields.map(
          ({ component: Field, label, name, options, size }, fieldIndex) => (
            <Box
              key={fieldIndex}
              sx={{
                flexBasis: "calc(33.333% - 16px)",
                flexGrow: 0,
                flexShrink: 0,
              }}
            >
              {Field === AppDatePicker ? (
                <Field
                  label={label}
                  name={name}
                  size={size}
                  date={traveler[name]}
                  zIndex = "1"
                  handleChnage={(date) => handleDateChange(index, name, date)}
                />
              ) : (
                <Field
                  label={label}
                  name={name}
                  options={options}
                  fullWidth
                  value={traveler[name]}
                  onChange={(e) =>
                    handleInputChange(index, name, e.target.value)
                  }
                  error={errors[`${index}-${name}`]}
                  size={size}
                />
              )}
            </Box>
          )
        )}
      </Box>
    </Box>
  );
  const handleSubmit = () => {
    // Transform the traveler data to match the required format
    const transformedTravelers = travelers.map((traveler, index) => ({
      id: (index + 1).toString(), // Generate an ID based on the index
      dateOfBirth: traveler.dob.toISOString().split("T")[0],
      gender: traveler.gender.toUpperCase(),
      name: {
        firstName: traveler.fullName,
        lastName: traveler.lastName,
      },
      documents: [
        {
          number: traveler.passportNumber,
          issuanceDate:
            traveler.passportIssuanceDate.toISOString().split("T")[0],

          expiryDate:
            traveler.passportExpiryDate.toISOString().split("T")[0],

          issuanceCountry: traveler.passportIssuanceCountry,
          issuanceLocation: traveler.passportIssuanceCity,
          nationality: traveler.nationality,
          birthPlace: traveler.country,
          documentType: "PASSPORT", // Hardcoded as per requirements
          holder: true, // Hardcoded as per requirements
        },
      ],
      contact: {
        purpose: "STANDARD", // Hardcoded
        phones: [
          {
            deviceType: "MOBILE", // Hardcoded
            countryCallingCode: traveler.countryPhoneCode,
            number: traveler.phoneNumber,
          },
        ],
        emailAddress: traveler.email,
      },
    }));

    // Prepare the body for the API request
    const body = {
      travelers: transformedTravelers,
      // Add other booking details here if needed
    };

    // Call the booking request API
    const res = submitBookingRequest(body);
    console.log("Response from submitBookingRequest:", res);

    // Show success notification
    enqueueSnackbar("Booking submitted successfully", { variant: "success" });
  };

  const navigate = useNavigate();

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          height: "4rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box style={{ width: "8.5%", textAlign: "center" }}>
          <ArrowBackIosNewIcon
            style={{ fontSize: "2.5rem", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </Box>
        <Box style={{ width: "70%" }}>
          <img src={AlasamLogo} />
        </Box>
        <Box style={{ width: "12.5%" }}>
          <Button variant="text" sx={{ mx: "0.5rem" }}>
            Support
          </Button>
          <AppButton text="My Bookings" borderColor="#581E47"
          />
        </Box>
      </Box>
      <Box sx={{ px: 20, mt: 2, mb: 5 }}>
        <Typography level="h4" sx={{ mb: 4 }}>
          Traveler Information
        </Typography>
        {travelers.map(renderTravelerForm)}
        <AppButton onClick={handleSubmit} sx={{ mt: 2 }} text="  Submit Booking" />


      </Box>
      <Box style={{ width: "100%", height: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box style={{ width: "80%", height: "auto" }}>
          <BookingFooter />
        </Box>
      </Box>
    </Box>
  );
};

export default Booking;
