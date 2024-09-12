import React, { useCallback, useState } from 'react';
import FormSelect from '../../components/common/FormSelect';
import AppDatePicker from '../../components/common/AppDatePicker';
import Box from "@mui/joy/Box";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AppRadioButtons from '../../components/common/AppRadioButtons';
import AppButton from '../../components/common/AppButton';
import SearchIcon from '@mui/icons-material/Search';
import PassengerCount from '../../components/PassengerCount';

import SearchSelect from '../../components/common/SearchSelect';
import { TripOptions } from '../../components/utils/constants';
import BookingFooter from './BookingFooter';
import { getFlightsData, searchCityCode } from '../../server/api';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../components/utils';
import FlightTicket from './FlightTicket';
import { setArrivalCity, setDepartureCity, setDepartureDate, setFlightTickets, setReturnDate } from '../../redux/reducer/ticketSlice';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../../redux/reducer/loaderSlice';
import BookingFilters from './BookingFilters';


const BookingEngine = () => {
    const [tripOption, setTripOption] = useState('One Way');
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    // const [departureCity, setDepartureCity] = useState(null);
    // const [arrivalCity, setArrivalCity] = useState(null);
    // const [departureDate, setDepartureDate] = useState(null);
    // const [returnDate, setReturnDate] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const [flightTickets, setFlightTickets] = useState([])
    const { enqueueSnackbar } = useSnackbar();
    const { adultsCount, childrenCount, infantsCount, flightTickets, departureCity, arrivalCity, departureDate, returnDate } = useSelector(state => state.ticket);
    const handleTripChange = (event) => {
        setTripOption(event.target.value);
    };

    const handleOpenPassengerCount = () => {
        setIsPopoverOpen(!isPopoverOpen)
    }

    const loadCityOptions = useCallback(async (inputValue) => {
        if (inputValue.length < 3) return [];
        try {
            const response = await searchCityCode(inputValue);
            console.log("res of city search ==", inputValue)
            return response.result.map(city => ({
                value: city.iataCode,
                label: `${city.name} (${city.iataCode})`
            }));
        } catch (error) {
            console.error('Error fetching city options:', error);
            return [];
        }
    }, []);

    const handleCityChange = (selectedOption, name) => {
        if (name === 'departure') {
            dispatch(setDepartureCity(selectedOption))
        } else if (name === 'arrival') {
            dispatch(setArrivalCity(selectedOption))
        }
    };

    const handleDateChnage = (selectedDate, name) => {
        if (name === 'departureDate') {
            dispatch(setDepartureDate(selectedDate))
        } else if (name === 'returnDate') {
            dispatch(setReturnDate(selectedDate))
        }

    }
    console.log("depaprtuer====", departureCity, arrivalCity)
    const handleSearch = () => {
        if (!departureCity || !arrivalCity || !departureDate || (tripOption === "Round Trip" && !returnDate)) {
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
        dispatch(setLoading(true))
        getFlightsData({
            startDate: formatDate(departureDate),
            endDate: finalReturnDate,
            arrival: arrivalCity?.value,
            departure: departureCity?.value,
            adultsCount,
            childrenCount,
            infantsCount,
        })
            .then(res => {
                console.log('Flight search result:', res);
                dispatch(setFlightTickets(res.result.ticket))
                dispatch(setLoading(false))

            })
            .catch(err => {
                console.error('Error fetching flights:', err);
                dispatch(setLoading(false))
            });
    };


    const handleTicketSelect = ({ flight }) => {
        console.log("selected flight is ........", flight)
        navigate("/booking", { state: { flight } });
    }

    return (

        <Box>

            <AppRadioButtons options={TripOptions} onChange={handleTripChange} defaultValue={tripOption} />
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    justifyContent: 'space-between',
                    alignItems: 'end',
                    flexWrap: 'wrap',
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
                    <AppDatePicker size='lg' startDecorator={<FlightLandIcon />} placeholder="Departure Date" name="departureDate" date={departureDate} handleChnage={handleDateChnage} />
                </Box>
                {tripOption === "Round Trip" &&
                    <Box sx={{ flex: 1 }}>
                        <AppDatePicker size='lg' startDecorator={<FlightLandIcon />} placeholder="Arrival Date" name="returnDate" date={returnDate} handleChnage={handleDateChnage} />
                    </Box>}
                <Box sx={{ flex: 1 }}>
                    <PassengerCount isPopoverOpen={isPopoverOpen} handleOpenPassengerCount={handleOpenPassengerCount} />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <AppButton startDecorator={<SearchIcon />} text="Search Flight" variant="contained"
                        color="#fff"
                        bgColor="#581E47"
                        height="48px"
                        width="10rem"
                        onClick={handleSearch}
                    />
                </Box>

            </Box>
            <Box sx={{ display: 'flex', mt: 10, gap: 3 }}
            >

                <BookingFilters />





                <Box  sx={{width: '100%'}}>
                    {flightTickets.length > 0 && flightTickets.map((flight) => (

                        <div>
                            <FlightTicket flight={flight} handleTicketSelect={handleTicketSelect} />
                        </div>))
                    }




                </Box>

            </Box>

            <BookingFooter />

        </Box>
    );
};

export default BookingEngine;
