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
import { getFlightRules, getFlightsData, getSabreFlightsData, searchCityCode } from "../../server/api";
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
import FlightRulesModal from "../../components/modals/FlightRules";
import FlightTicketCard from "./FlightTicket";

const BookingEngine = () => {
  const [tripOption, setTripOption] = useState("One Way");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [openFlightRule, setOpenFlightRule] = useState(false)
  const [selectedFlightRules, setSelectedFlightRules] = useState([])
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

    // If it's a "One Way" trip, set the return date to null
    let finalReturnDate = tripOption === "One Way" ? null : returnDate;

    if (tripOption === "Round Trip") {
      // Validate that the return date is not before the departure date
      if (new Date(returnDate) < new Date(departureDate)) {
        enqueueSnackbar("Return date cannot be before the departure date.", {
          variant: "error",
        });
        return;
      }
      finalReturnDate = formatDate(returnDate);
    }

    dispatch(setLoading(true));

    const searchParams = {
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
    };

    let mergedTickets = [];

    // Function to handle API responses
    const handleApiResponse = (apiName, data) => {
      console.log(`${apiName} API response received:`, data);
      if (data && data.result && data.result.ticket) {
        mergedTickets = [...mergedTickets, ...data.result.ticket];
      }
    };

    // Function to handle API errors
    const handleApiError = (apiName, error) => {
      console.error(`Error fetching flights from ${apiName} API:`, error);
      enqueueSnackbar(`Failed to fetch data from ${apiName} API. Please try again.`, {
        variant: "warning",
      });
    };

    // Fetch data from the first API
    getFlightsData(searchParams)
      .then(data => handleApiResponse("First", data))
      .catch(error => handleApiError("First", error))
      .finally(() => {
        // Fetch data from the second API
        getSabreFlightsData(searchParams)
          .then(data => handleApiResponse("Sabre", data))
          .catch(error => handleApiError("Sabre", error))
          .finally(() => {
            // Dispatch the merged tickets and set loading to false
            dispatch(setFlightTickets(mergedTickets));
            dispatch(setLoading(false));

            if (mergedTickets.length === 0) {
              enqueueSnackbar("No flight tickets found. Please try different search criteria.", {
                variant: "info",
              });
            }
          });
      });
  };
  const handleTicketSelect = ({ flight }) => {

    navigate("/booking", { state: { flight } });
  };
  const [baggage, setBaggage] = useState(false)



  const handleBaggage = () => {
    setBaggage(!baggage)
  }

  const handleRuleClick = async (flightOffers) => {

    const body = {
      flightOffers: flightOffers
    }
    try {
      dispatch(setLoading(true))
      const res = await getFlightRules(body)
      setSelectedFlightRules(res.result)
      setOpenFlightRule(true)
      dispatch(setLoading(false))
    }
    catch (error) {
      dispatch(setLoading(false))
      console.log("error in fetching flight rule", error)

    }
    finally {
      dispatch(setLoading(false))
    }
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
            variant="solid"

            height="48px"
            width="12rem"
            onClick={handleSearch}
          />
        </Box>
      </Box>
      {flightTickets.length > 0 && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            mt: 5,
            gap: 3
          }}
        >
          <BookingFilters />
          <Box
            sx={{ width: "100%" }}
          >
            <TicketsTopBar />
            {flightTickets.length > 0 && flightTickets
              .slice() // Create a shallow copy of the array to avoid mutating Redux state
              .sort((a, b) => a.totalFare - b.totalFare) // Sort by totalFare (low to high)
              .map((flight) => (
                <div>
                  <FlightTicketCard
                    flight={flight}
                    handleTicketSelect={handleTicketSelect}
                    handleBaggage={handleBaggage}
                    baggage={baggage}
                    handleRuleClick={handleRuleClick}
                  />
                </div>
              ))}
          </Box>
        </Box>
      )}

      <Box sx={{ mt: flightTickets.length == 0 ? "12rem" : "0rem" }}>
        <BookingFooter />
      </Box>

      <FlightRulesModal openFlightRule={openFlightRule} setOpenFlightRule={setOpenFlightRule} selectedFlightRules={selectedFlightRules} />
    </Box>
  );
};

export default BookingEngine;
