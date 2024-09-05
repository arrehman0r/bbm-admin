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
import { AspectRatio, Avatar, Card, Typography } from '@mui/joy';
import { Opacity } from '@mui/icons-material';

const BookingEngine = () => {
    const [tripOption, setTripOption] = useState('One Way');
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const TripOptions = [
        { label: 'One Way', value: 'One Way' },
        { label: 'Round Trip', value: 'Round Trip' },

    ];

    const cards = [
        {
            title: 'Download Bookme App', src: "/static/images/avatar/1.jpg", description: 'Find the best deals on our mobile app', alt: 'a'
        },
        { title: 'Help Center', src: "/static/images/avatar/1.jpg", description: 'Contact with our support team', alt: 'a' },
        { title: 'Manage Bookings', src: "/static/images/avatar/1.jpg", description: 'View and manage your bookings', alt: 'a' },
    ]

    const images = [
        {
            src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
            title: 'Night view',
            description: '4.21M views',
        },
        {
            src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
            title: 'Lake view',
            description: '4.74M views',
        },
        {
            src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
            title: 'Mountain view',
            description: '3.98M views',
        },
    ];



    const handleTripChange = (event) => {
        setTripOption(event.target.value);
    };

    const handleOpenPassengerCount = () => {
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
                    <PassengerCount isPopoverOpen={isPopoverOpen} handleOpenPassengerCount={handleOpenPassengerCount} />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <AppButton startDecorator={<SearchIcon />} text="Search Flight" variant="contained"
                        color="#fff"
                        bgColor="#581E47"
                        height="48px"
                        width="10rem" />
                </Box>

            </Box>

            <Box sx={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                {cards.map((card, index) => (
                    <Card sx={{ width: 400 }} key={index}>
                        <div style={{ display: "flex", justifyContent: "space-around", gap: '10px' }}>
                            <div>
                                <Avatar src={card?.src} />
                            </div>
                            <div>
                                <Typography variant="h6">{card.title}</Typography>
                                <Typography variant="body2">{card.description}</Typography>

                            </div>
                        </div>
                    </Card>
                ))}



            </Box>

            <Typography level='h2' style={{ marginTop: '50px' }}>Latest Offers</Typography>
            <Typography level='h5' sx={{ fontSize: 'xl' }}>We provide the best and most affordable services in Pakistan.</Typography>

            <div style={{ width: "95%", display: 'flex', justifyContent: 'space-between', marginTop: "80px" }}>
                {images.map((image) => (
                    <AspectRatio ratio="2" sx={{ minWidth: 400 }}>
                        <img
                            srcSet={image.src}
                            src={image.src}
                            style={{ borderRadius: '10px' }}
                        />
                    </AspectRatio>
                ))}


            </div>


            <Box style={{ backgroundColor: 'black', height: '350px', width: '100%', marginTop: '60px', padding: '25px' }}>
                <div style={{ padding: '25px' }} >
                    <Typography level='h2' style={{ color: "white" }}>Why Use Bookme?</Typography>
                    <Typography level='h5' sx={{ fontSize: 'xl', color: "white" }}>We provide the best deals in Pakistan.</Typography>
                </div>
                <div style={{ display: "flex", marginTop: '20px' , justifyContent:"space-between" }}>
                    {cards.map((card, index) => (
                        <Card sx={{ width: 350, border: "none", backgroundColor: "transparent" }} key={index}>
                            <div style={{ display: "flex", justifyContent: "space-around", gap: '10px' }}>
                                <div>
                                    <Avatar src={card?.src} />
                                </div>
                                <div>
                                    <Typography variant="h6" level="h3">{card.title}</Typography>
                                    <Typography variant="body2" level="h4">{card.description}</Typography>

                                </div>
                            </div>
                        </Card>
                    ))}

                </div>
            </Box>

        </Box>
    );
};

export default BookingEngine;
