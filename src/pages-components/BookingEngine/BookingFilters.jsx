import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails, { accordionDetailsClasses } from '@mui/joy/AccordionDetails';
import AccordionSummary, { accordionSummaryClasses } from '@mui/joy/AccordionSummary';
import Switch from '@mui/joy/Switch';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import ListItemContent from '@mui/joy/ListItemContent';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import Slider from '@mui/joy/Slider';
import PaidIcon from '@mui/icons-material/Paid';
import { Box, Checkbox, Radio, RadioGroup } from '@mui/joy';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { Airlines, Currencies, TravelOptions } from '../../components/utils/constants';
import AirlinesIcon from '@mui/icons-material/Airlines';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import AddCardIcon from '@mui/icons-material/AddCard';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { useDispatch, useSelector } from 'react-redux';
import { setFlightStops, setFlightPriceRange, setTicketClass, setAirlinePreference, setCurrencyPreference, setTicketCount, resetFilters } from "./../../redux/reducer/ticketSlice"
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
export default function BookingFilters() {
  const dispatch = useDispatch();
  const { currencyPreference, airLinePreference, ticketClass, ticketCount, flightPriceRange, flightStops } = useSelector(state => state.ticket);
  const handleStopsChange = (event) => {
    dispatch(setFlightStops(event.target.checked ? true : false));
  };

  const handlePriceRangeChange = (event, newValue) => {
    dispatch(setFlightPriceRange(newValue));
  };

  const handleTicketCountChange = (event, newValue) => {
    dispatch(setTicketCount(newValue));
  };

  const handleTravelClassChange = (event) => {
    dispatch(setTicketClass(event.target.value));
  };

  const handleResetFilters = () => {
    console.log("reseting.........")
    dispatch(resetFilters());
  };


  const [selectedAirlines, setSelectedAirlines] = React.useState([]);

  // ... other handler functions remain the same

  const handleAirlinePreferenceChange = (event) => {
    const { value, checked } = event.target;
    setSelectedAirlines(prevSelected => {
      let newSelected;
      if (checked) {
        newSelected = [...prevSelected, value];
      } else {
        newSelected = prevSelected.filter(airline => airline !== value);
      }

      // Dispatch the comma-separated string of airline codes
      const airlineString = newSelected.join(',');
      console.log("Selected airlines:", airlineString);
      dispatch(setAirlinePreference(airlineString));

      return newSelected;
    });
  };
  const handleCurrencyChange = (event) => {
    dispatch(setCurrencyPreference(event.target.value));
  };

  return (
    <Box
    style={{
      width: "30%",
      height: "auto",
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "20px",
    }}
    sx={{
      display: {
        xs: 'none',
        sm: 'none',
        md: 'none',
        lg: 'block',
        xl:'block',
      },
    }}
  >
    <AccordionGroup
      variant="plain"
      transition="0.2s"
      sx={{
        border: '1px solid #CCD6E0',
        maxWidth: 400,
        borderRadius: 'md',
        [`& .${accordionDetailsClasses.content}.${accordionDetailsClasses.expanded}`]: {
          paddingBlock: '1rem',
        },
        [`& .${accordionSummaryClasses.button}`]: {
          paddingBlock: '1rem',
        },
      }}
    >

      <Accordion>
        <AccordionSummary indicator={false} onClick = {handleResetFilters}>
          <Avatar color="danger">
            <RestartAltIcon />
          </Avatar>
          <ListItemContent>
            <Typography level="title-md">Reset</Typography>
            <Typography level="body-sm">Reset all your filters</Typography>
          </ListItemContent>
        </AccordionSummary>
        {/* <AccordionDetails>
          <Stack spacing={1.5}>
            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <AirlineStopsIcon fontSize="xl2" sx={{ mx: 1 }} />
              <FormLabel>Non Stop</FormLabel>
              <Switch size="md" onChange={handleStopsChange} checked={flightStops} />
            </FormControl>
          </Stack>
        </AccordionDetails> */}
      </Accordion>



      <Accordion>
        <AccordionSummary>
          <Avatar color="primary">
            <AirplanemodeActiveIcon />
          </Avatar>
          <ListItemContent>
            <Typography level="title-md">Stops</Typography>
            <Typography level="body-sm">Select stops from here</Typography>
          </ListItemContent>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1.5}>
            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <AirlineStopsIcon fontSize="xl2" sx={{ mx: 1 }} />
              <FormLabel>Non Stop</FormLabel>
              <Switch size="md" onChange={handleStopsChange} checked={flightStops} />
            </FormControl>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Avatar color="warning">
            <LocalActivityOutlinedIcon />
          </Avatar>
          <ListItemContent>
            <Typography level="title-md">Ticket Count</Typography>
            <Typography level="body-sm">How many tickets you want to see</Typography>
          </ListItemContent>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1.5}>
            <FormControl sx={{ gap: 1 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <ConfirmationNumberOutlinedIcon fontSize="xl2" />
                <FormLabel sx={{ m: 0 }}>Count</FormLabel>
              </Box>
              <Slider max={250} min={1} onChange={handleTicketCountChange} valueLabelDisplay="auto" value={ticketCount} />
            </FormControl>
          </Stack>
        </AccordionDetails>
      </Accordion>




      <Accordion>
        <AccordionSummary>
          <Avatar color="success">
            <RequestQuoteIcon />
          </Avatar>
          <ListItemContent>
            <Typography level="title-md">Price Range</Typography>
            <Typography level="body-sm">Select price ranges</Typography>
          </ListItemContent>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1.5}>
            <FormControl sx={{ gap: 1 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <PaidIcon fontSize="xl2" />
                <FormLabel sx={{ m: 0 }}>Range</FormLabel>
              </Box>
              <Slider max={100000} min={50} onChange={handlePriceRangeChange} valueLabelDisplay="auto" value={flightPriceRange} />
            </FormControl>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Avatar color="danger">
            <AccessibilityNewRoundedIcon />
          </Avatar>
          <ListItemContent>
            <Typography level="title-md">Travel Class</Typography>
            <Typography level="body-sm">Toggle your travel class settings</Typography>
          </ListItemContent>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup name="accessibility-options" defaultValue="economy" onChange={handleTravelClassChange} value={ticketClass}>
            <Stack>
              {TravelOptions.map((option) => (
                <FormControl key={option.value} orientation="horizontal" sx={{ gap: 1 }}>
                  <AirlinesIcon fontSize="xl2" sx={{ mx: 1 }} />
                  <Radio value={option.value} size="sm" />
                  <FormLabel>{option.label}</FormLabel>
                </FormControl>
              ))}
            </Stack>
          </RadioGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Avatar color="warning">
            <AirplaneTicketIcon />
          </Avatar>
          <ListItemContent>
            <Typography level="title-md">Airlines</Typography>
            <Typography level="body-sm">Toggle your travel line settings</Typography>
          </ListItemContent>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup name="airline-preferences"  >
            <Stack>
              {Airlines.map((option) => (
                <FormControl key={option.code} orientation="horizontal" sx={{ gap: 1 }}>
                  <ConnectingAirportsIcon fontSize="xl2" sx={{ mx: 1 }} />
                  <Checkbox value={option.code} size="sm" onChange={handleAirlinePreferenceChange} checked={typeof airLinePreference === 'string' && airLinePreference.split(',').includes(option.code)} />
                  <FormLabel>{option.label}</FormLabel>
                </FormControl>
              ))}
            </Stack>
          </RadioGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Avatar color="primary">
            <CurrencyBitcoinIcon />
          </Avatar>
          <ListItemContent>
            <Typography level="title-md">Select Currency</Typography>
            <Typography level="body-sm">Toggle your currency settings</Typography>
          </ListItemContent>
        </AccordionSummary>
        <AccordionDetails>
          {console.log("currency prefrences", currencyPreference)}
          <RadioGroup name="currency-options" onChange={handleCurrencyChange} value={currencyPreference.code}  >
            <Stack>
              {Currencies.map((option) => (
                <FormControl key={option.code} orientation="horizontal" sx={{ gap: 1 }}>
                  <AddCardIcon fontSize="xl2" sx={{ mx: 1 }} />
                  <Radio value={option.code} size="sm" />
                  <FormLabel>{option.label}</FormLabel>
                </FormControl>
              ))}
            </Stack>
          </RadioGroup>
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
    </Box>
  );
}
