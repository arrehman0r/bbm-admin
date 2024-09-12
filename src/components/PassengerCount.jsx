import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Stack from '@mui/joy/Stack';
import { Popover } from 'react-tiny-popover';
import { Box, FormControl } from "@mui/joy";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Sheet from '@mui/joy/Sheet';
import AppButton from './common/AppButton';
import TextHeading from './common/TextHeading';
import { setAdultsCount, setChildrenCount, setInfantCount } from './../redux/reducer/ticketSlice'

const PassengerCount = ({ handleOpenPassengerCount, isPopoverOpen }) => {
    const dispatch = useDispatch();
    const { adultsCount, childrenCount, infantsCount } = useSelector(state => state.ticket);
    const totalTravllers = adultsCount + childrenCount + infantsCount
    const incrementCount = (type) => {
        if (type === 'adult') {
            dispatch(setAdultsCount(adultsCount + 1));
        } else if (type === 'children') {
            dispatch(setChildrenCount(childrenCount + 1));
        } else if (type === 'infant') {
            dispatch(setInfantCount(infantsCount + 1));
        }
    };

    const decrementCount = (type) => {
        if (type === 'adult' && adultsCount > 0) {
            dispatch(setAdultsCount(adultsCount - 1));
        } else if (type === 'children' && childrenCount > 0) {
            dispatch(setChildrenCount(childrenCount - 1));
        } else if (type === 'infant' && infantsCount > 0) {
            dispatch(setInfantCount(infantsCount - 1));
        }
    };

    return (
        <div>
            <FormControl size="lg">
                <Popover
                    isOpen={isPopoverOpen}
                    positions={['bottom', 'left']}
                    padding={10}
                    onClickOutside={handleOpenPassengerCount}
                    content={({ position, childRect, popoverRect }) => (
                        <Sheet variant="outlined" color="neutral" sx={{ p: 1, borderRadius: 5 }}>
                            <Stack spacing={2} sx={{ alignItems: 'center' }}>
                                {/* Adults */}
                                <Box sx={{ display: 'flex', gap: 5, justifyContent: 'space-between', width: '100%' }}>
                                    <TextHeading text="Adults" />
                                    <ButtonGroup size="sm">
                                        <AppButton startDecorator={<RemoveIcon />} onClick={() => decrementCount('adult')} />
                                        <AppButton text={String(adultsCount)} />
                                        <AppButton startDecorator={<AddIcon />} onClick={() => incrementCount('adult')} />
                                    </ButtonGroup>
                                </Box>

                                {/* Children */}
                                <Box sx={{ display: 'flex', gap: 5, justifyContent: 'space-between', width: '100%' }}>
                                    <TextHeading text="Children" />
                                    <ButtonGroup size="sm">
                                        <AppButton startDecorator={<RemoveIcon />} onClick={() => decrementCount('children')} />
                                        <AppButton text={String(childrenCount)} />
                                        <AppButton startDecorator={<AddIcon />} onClick={() => incrementCount('children')} />
                                    </ButtonGroup>
                                </Box>

                                {/* Infants */}
                                <Box sx={{ display: 'flex', gap: 5, justifyContent: 'space-between', width: '100%' }}>
                                    <TextHeading text="Infants" />
                                    <ButtonGroup size="sm">
                                        <AppButton startDecorator={<RemoveIcon />} onClick={() => decrementCount('infant')} />
                                        <AppButton text={String(infantsCount)} />
                                        <AppButton startDecorator={<AddIcon />} onClick={() => incrementCount('infant')} />
                                    </ButtonGroup>
                                </Box>
                            </Stack>
                        </Sheet>
                    )}
                >
                    <div onClick={handleOpenPassengerCount} style={{ width: '100%' }}>
                        <AppButton text={totalTravllers > 0 ? `Total Travellers ${totalTravllers}` : "Select Adults"} onClick={handleOpenPassengerCount} width="100%" height="48px" bgColor="#FBFCFE" color="#32383E" borderColor="#CDD7E1" />
                    </div>
                </Popover>
            </FormControl>
        </div>
    );
};

export default PassengerCount;
