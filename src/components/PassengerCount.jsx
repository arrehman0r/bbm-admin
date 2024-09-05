import React, { useState } from 'react';
// import Popover from '@mui/material/Popover';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Stack from '@mui/joy/Stack';
import { Popover } from 'react-tiny-popover'
import { Box, FormControl, Input } from "@mui/joy";
import AddIcon from '@mui/icons-material/Add';
import AppButton from './common/AppButton';
import RemoveIcon from '@mui/icons-material/Remove';
import Sheet from '@mui/joy/Sheet';
import TextHeading from './common/TextHeading';
const PassengerCount = ({ handleOpenPassengerCount, isPopoverOpen }) => {



    return (
        <div>
            <FormControl size="lg">
                <Popover
                    isOpen={isPopoverOpen}
                    positions={['bottom', 'left']}
                    padding={10}
                    onClickOutside={handleOpenPassengerCount}
                    // ref={clickMeButtonRef} 
                    content={({ position, childRect, popoverRect }) => (

                        <Sheet variant="outlined" color="neutral" sx={{ p: 1, borderRadius: 5 }}>
                            <Stack spacing={2} sx={{ alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', gap: 5, justifyContent: 'space-between', width: '100%' }}>
                                    <TextHeading text="Adults" />
                                    <ButtonGroup size="sm" aria-label="outlined button group">

                                        <AppButton startDecorator={<RemoveIcon />} />
                                        <AppButton text="5" />
                                        <AppButton startDecorator={<AddIcon />} />

                                    </ButtonGroup>
                                </Box>


                                <Box sx={{ display: 'flex', gap: 5, justifyContent: 'space-between', width: '100%' }}>
                                    <TextHeading text="Childrens" />
                                    <ButtonGroup size="sm" aria-label="outlined button group">

                                        <AppButton startDecorator={<RemoveIcon />} />
                                        <AppButton text="5" />
                                        <AppButton startDecorator={<AddIcon />} />

                                    </ButtonGroup>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 5, justifyContent: 'space-between', width: '100%' }}>
                                    <TextHeading text="Infants" />
                                    <ButtonGroup size="sm" aria-label="outlined button group">

                                        <AppButton startDecorator={<RemoveIcon />} onClick={() => console.log("remove click ........")} />
                                        <AppButton text="5" />
                                        <AppButton startDecorator={<AddIcon />} />

                                    </ButtonGroup>
                                </Box>


                            </Stack>
                        </Sheet>

                    )}
                >
                    <div onClick={handleOpenPassengerCount} style={{ width: '100%' }}>
                        <AppButton text="Select Adults" onClick={handleOpenPassengerCount} width="100%" height="48px" bgColor="#FBFCFE" color="#7B7F84" borderColor="#CDD7E1" />
                    </div>
                </Popover>
            </FormControl>
        </div>
    );
}

export default PassengerCount