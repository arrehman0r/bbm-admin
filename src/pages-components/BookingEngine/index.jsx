import React, { useCallback, useState } from "react";
import FormSelect from "../../components/common/FormSelect";
import AppDatePicker from "../../components/common/AppDatePicker";
import Box from "@mui/joy/Box";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AppRadioButtons from "../../components/common/AppRadioButtons";
import AppButton from "../../components/common/AppButton";
import SearchIcon from "@mui/icons-material/Search";
import PassengerCount from "../../components/PassengerCount";

import SearchSelect from "../../components/common/SearchSelect";
import { TripOptions } from "../../components/utils/constants";
import BookingFooter from "./BookingFooter";
import { getFlightsData, searchCityCode } from "../../server/api";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../components/utils";
import FlightTicket from "./FlightTicket";
import {
  setArrivalCity,
  setDepartureCity,
  setDepartureDate,
  setFlightTickets,
  setReturnDate,
  setTripType,
} from "../../redux/reducer/ticketSlice";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../redux/reducer/loaderSlice";
import BookingFilters from "./BookingFilters";
import TicketsTopBar from "./TicketsTopBar";
import Ticket from "./Ticket";

const BookingEngine = () => {
  const [tripOption, setTripOption] = useState("One Way");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  // const [departureCity, setDepartureCity] = useState(null);
  // const [arrivalCity, setArrivalCity] = useState(null);
  // const [departureDate, setDepartureDate] = useState(null);
  // const [returnDate, setReturnDate] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [flightTickets, setFlightTickets] = useState([])
  const { enqueueSnackbar } = useSnackbar();
  const {
    adultsCount,
    childrenCount,
    tripType,
    infantsCount,
    flightTickets,
    departureCity,
    arrivalCity,
    departureDate,
    returnDate,
    currencyPreference,
    airLinePreference,
    ticketClass,
    ticketCount,
    flightPriceRange,
    flightStops,
  } = useSelector((state) => state.ticket);
  const handleTripChange = (event) => {
    setTripOption(event.target.value);
    console.log("event.tagert", event.target);
    dispatch(setTripType(event.target.value));
  };
  console.log(
    "filters are >>>>>>",
    currencyPreference,
    airLinePreference,
    ticketClass,
    ticketCount,
    flightPriceRange,
    flightStops
  );
  const handleOpenPassengerCount = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const loadCityOptions = useCallback(async (inputValue) => {
    if (inputValue.length < 3) return [];
    console.log("cityu is calling.......")
    try {
      const response = await searchCityCode(inputValue);
      console.log("res of city search ==", inputValue);
      return response.result.map((city) => ({
        value: city.iataCode,
        label: `${city.name} (${city.iataCode})`,
      }));
    } catch (error) {
      console.error("Error fetching city options:", error);
      return [];
    }
  }, []);

  const handleCityChange = (selectedOption, name) => {
    if (name === "departure") {
      console.log("dispathching.......")
      dispatch(setDepartureCity(selectedOption));
    } else if (name === "arrival") {
      dispatch(setArrivalCity(selectedOption));
    }
  };

  const handleDateChnage = (selectedDate, name) => {
    if (name === "departureDate") {
      dispatch(setDepartureDate(selectedDate));
    } else if (name === "returnDate") {
      dispatch(setReturnDate(selectedDate));
    }
  };
  console.log("depaprtuer====", departureCity, arrivalCity);
  const handleSearch = () => {
    if (
      !departureCity ||
      !arrivalCity ||
      !departureDate ||
      (tripOption === "Round Trip" && !returnDate)
    ) {
      enqueueSnackbar("Please fill in all required fields.", {
        variant: "error",
      });
      return;
    }

    if (adultsCount === 0) {
      enqueueSnackbar("Please select travelers.", {
        variant: "error",
      });
      return;
    }

    // If it's a "One Way" trip, set the return date to "00-00-00"
    let finalReturnDate = returnDate;
    if (tripOption === "One Way") {
      finalReturnDate = null;
    } else {
      // Validate that the return date is not before the departure date
      if (new Date(returnDate) < new Date(departureDate)) {
        enqueueSnackbar("Return date cannot be before the departure date.", {
          variant: "error",
        });
        return;
      }
    }
    if (tripOption === "Round Trip") {
      finalReturnDate = formatDate(returnDate);
    }
    dispatch(setLoading(true));
    getFlightsData({
      startDate: formatDate(departureDate),
      endDate: finalReturnDate,
      arrival: arrivalCity?.value,
      departure: departureCity?.value,
      adultsCount,
      childrenCount,
      infantsCount,
      currencyPreference,
      airLinePreference,
      ticketClass,
      ticketCount,
      flightPriceRange,
      flightStops,
    })
      .then((res) => {
        console.log("Flight search result:", res);
        dispatch(setFlightTickets(res.result.ticket));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        console.error("Error fetching flights:", err);
        dispatch(setLoading(false));
      });
  };

  const handleTicketSelect = ({ flight }) => {
    console.log("selected flight is ........", flight);
    navigate("/booking", { state: { flight } });
  };
  const [baggage, setBaggage] = useState(false)

  const handleBaggage=()=>{
    setBaggage(!baggage )
  }

  return (
    <Box>
      <AppRadioButtons
        options={TripOptions}
        onChange={handleTripChange}
        defaultValue={tripType}
      />
      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "space-between",
          alignItems: "end",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <SearchSelect
            placeholder="Departure"
            onChange={handleCityChange}
            _name="departure"
            loadOptions={loadCityOptions}
            value={departureCity}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <SearchSelect
            placeholder="Arrival"
            onChange={handleCityChange}
            _name="arrival"
            loadOptions={loadCityOptions}
            value={arrivalCity}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <AppDatePicker
            size="lg"
            startDecorator={<FlightLandIcon />}
            placeholder="Departure Date"
            name="departureDate"
            date={departureDate}
            handleChange={handleDateChnage}
            minDate={new Date()}
          />
        </Box>
        {tripType === "Round Trip" && (
          <Box sx={{ flex: 1 }}>
            <AppDatePicker
              size="lg"
              startDecorator={<FlightLandIcon />}
              placeholder="Arrival Date"
              name="returnDate"
              date={returnDate}
              handleChange={handleDateChnage}
              minDate={new Date()}
            />
          </Box>
        )}
        <Box sx={{ flex: 1 }}>
          <PassengerCount
            isPopoverOpen={isPopoverOpen}
            handleOpenPassengerCount={handleOpenPassengerCount}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <AppButton
            startDecorator={<SearchIcon />}
            text="Search Flight"
            variant="contained"
            color="#fff"
            bgColor="#581E47"
            height="48px"
            width="10rem"
            onClick={handleSearch}
          />
        </Box>
      </Box>
      {flightTickets.length > 0 && (
        <Box
          style={{
            width: "100%",
            display: "flex",
            marginTop: "40px",
          }}
        >
          <BookingFilters />
          <Box
            sx={{
              height: "auto",
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              padding: "10px",
              width: {
                xs: "100%",
                sm: "100%",
                md: "100%",
                lg: "75%",
                xl: "75%",
              },
            }}
          >
            <TicketsTopBar />
            {flightTickets.length > 0 &&
              flightTickets.map((flight) => (
                <div>
                  <Ticket
                    flight={flight}
                    handleTicketSelect={handleTicketSelect}
                    handleBaggage={handleBaggage}
                    baggage={baggage}
                  />
                </div>
              ))}
          </Box>
        </Box>
      )}

      <BookingFooter />
    </Box>
  );
};

export default BookingEngine;
