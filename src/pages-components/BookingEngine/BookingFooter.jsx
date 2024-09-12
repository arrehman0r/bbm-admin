import React from "react";
import { AspectRatio, Avatar, Card, Typography } from '@mui/joy';
import { cards, images } from '../../components/utils/constants';
import Box from "@mui/joy/Box";
const BookingFooter = ()=>{

    return(<div>

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
                    <Typography level='h2' style={{ color: "white" }}>Why Use Alasam?</Typography>
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



    </div>)
}


export default BookingFooter