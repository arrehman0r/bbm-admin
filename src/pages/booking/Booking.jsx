import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/joy';
import { Country, City } from "country-state-city";
import { useSnackbar } from 'notistack';
import InputField from '../../components/common/InputField';
import FormSelect from '../../components/common/FormSelect';
import AppDatePicker from '../../components/common/AppDatePicker';

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
      const totalTravelers = flight.totalAdults + flight.totalChildren + flight.totalInfants;
      setTravelers(Array(totalTravelers).fill().map((_, index) => ({
        type: index < flight.totalAdults ? 'Adult' : 
              index < flight.totalAdults + flight.totalChildren ? 'Child' : 'Infant',
        fullName: '',
        lastName: '',
     
        country: '',
        city: '',
        phoneNumber: '',
        email: '',
        dob: null,
        passportIssuanceDate: null,
        passportExpiryDate: null
      })));
    }
  }, [flight]);

  const handleInputChange = (index, field, value) => {
    setTravelers(prevTravelers => {
      const newTravelers = [...prevTravelers];
      newTravelers[index] = { ...newTravelers[index], [field]: value };
      return newTravelers;
    });

    if (field === "country") {
      const selectedCountry = countries.find((c) => c.name === value);
      if (selectedCountry) {
        setCities(City.getCitiesOfCountry(selectedCountry.isoCode).map(city => city.name));
      } else {
        setCities([]);
      }
    }
  };

  const handleDateChange = (index, field, date) => {
    setTravelers(prevTravelers => {
      const newTravelers = [...prevTravelers];
      newTravelers[index] = { ...newTravelers[index], [field]: date };
      return newTravelers;
    });
  };

  const formFields = [ { component: InputField, label: "CNIC *", name: "cnic" },
    { component: InputField, label: "First Name *", name: "fullName" },
    { component: InputField, label: "Last Name *", name: "lastName" },
    { component: FormSelect, label: "Place of Birth *", name: "country", options: countries.map(c => c.name) },
    { component: FormSelect, label: "Nationality *", name: "nationality", options: countries.map(c => c.name) },
    { component: FormSelect, label: "City *", name: "city", options: cities },
    { component: FormSelect, label: "Gender *", name: "gender", options: ["Male", "Female"] },
    { component: FormSelect, label: "Country Phone Code *", name: "countryPhoneCode", options: [] },

    { component: InputField, label: "Phone *", name: "phoneNumber" },
    { component: InputField, label: "Email *", name: "email" },
    { component: AppDatePicker, name: "dob", size: "sm", label: "Date of Birth" },
    { component: AppDatePicker, name: "passportIssuanceDate", size: "sm", label: "Passport Issuance Date" },
    { component: AppDatePicker, name: "passportExpiryDate", size: "sm", label: "Passport Expiry Date" },
    { component: FormSelect, label: "Passport Issuance Country *", name: "passportIssuanceCountry", options: countries.map(c => c.name) },
    { component: FormSelect, label: "Passport Issuance City *", name: "passportIssuanceCity", options: countries.map(c => c.name) },


  ];

  const renderTravelerForm = (traveler, index) => (
    <Box key={index} sx={{ mb: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography level="h5" sx={{ mb: 2 }}>{`${traveler.type} ${index + 1}`}</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {formFields.map(({ component: Field, label, name, options, size }, fieldIndex) => (
          <Box key={fieldIndex} sx={{ flexBasis: "calc(33.333% - 16px)", flexGrow: 0, flexShrink: 0 }}>
            {Field === AppDatePicker ? (
              <Field
                label={label}
                name={name}
                size={size}
                date={traveler[name]}
                setDate={(date) => handleDateChange(index, name, date)}
              />
            ) : (
              <Field
                label={label}
                name={name}
                options={options}
                fullWidth
                value={traveler[name]}
                onChange={(e) => handleInputChange(index, name, e.target.value)}
                error={errors[`${index}-${name}`]}
                size={size}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );

  const handleSubmit = () => {
    // Implement form validation and submission logic here
    console.log(travelers);
    enqueueSnackbar('Booking submitted successfully', { variant: 'success' });
  };

  return (
    <Box sx={{ px: 20, mt: 2, mb: 5 }}>
      <Typography level="h4" sx={{ mb: 4 }}>Traveler Information</Typography>
      {travelers.map(renderTravelerForm)}
      <Button onClick={handleSubmit} sx={{ mt: 2 }}>Submit Booking</Button>
    </Box>
  );
};

export default Booking;