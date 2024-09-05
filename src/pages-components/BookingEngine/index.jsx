import React, { useState } from 'react';
import FormSelect from '../../components/common/FormSelect';
import AppDatePicker from '../../components/common/AppDatePicker';
import Box from "@mui/joy/Box";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AppRadioButtons from '../../components/common/AppRadioButtons';
import AppButton from '../../components/common/AppButton';
import SearchIcon from '@mui/icons-material/Search';
import PassengerCount from '../../components/PassengerCount';

const BookingEngine = () => {
    const [tripOption, setTripOption] = useState('One Way');
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const TripOptions = [
        { label: 'One Way', value: 'One Way' },
        { label: 'Round Trip', value: 'Round Trip' },

    ];


    const handleTripChange = (event) => {
        setTripOption(event.target.value);
    };

    const handleOpenPassengerCount = ()=> {
        setIsPopoverOpen(!isPopoverOpen)
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
                    <FormSelect placeholder="Departure" startDecorator={<FlightTakeoffIcon />} size="lg" />
                </Box>

                <Box sx={{ flex: 1 }}>
                    <FormSelect placeholder="Arrival" startDecorator={<FlightLandIcon />} size="lg" />
                </Box>

                <Box sx={{ flex: 1 }}>
                    <AppDatePicker startDecorator={<FlightLandIcon />} placeholder="Departure Date" />
                </Box>
                {tripOption === "Round Trip" &&
                    <Box sx={{ flex: 1 }}>
                        <AppDatePicker startDecorator={<FlightLandIcon />} placeholder="Arrival Date" />
                    </Box>}
                <Box sx={{ flex: 1 }}>
                    <PassengerCount isPopoverOpen = {isPopoverOpen} handleOpenPassengerCount={handleOpenPassengerCount} />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <AppButton startDecorator={<SearchIcon />} text="Search Flight" variant="contained"
                        color="#fff"
                        bgColor="#581E47"
                        height="48px"
                        width="10rem" />
                </Box>

            </Box>
        </Box>
    );
};

export default BookingEngine;
