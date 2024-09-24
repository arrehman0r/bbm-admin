import * as React from 'react';
import { Card, CardContent, Chip, Stack, Typography, IconButton, Accordion, AccordionSummary, AccordionDetails, Divider, Box } from '@mui/joy';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatDate, formatDuration } from '../../components/utils';
import AppButton from '../../components/common/AppButton';

const FlightInfo = ({ flight, isReturn }) => (
  <Stack spacing={2} sx={{ width: '100%' }}>
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <Stack>
        <Typography level="body-xs">Flight Number</Typography>
        <Typography level="body-sm">{flight?.marketingFlightNumber}</Typography>
      </Stack>
      <Stack>
        <Typography level="body-xs">Airline</Typography>
        <Typography level="body-sm">{flight?.marketing}</Typography>
      </Stack>
      <Typography level="title-sm" color={isReturn ? "success" : "primary"}>
        {isReturn ? "Return" : "Departure"}
      </Typography>
    </Stack>
    <Box sx={{ position: 'relative', height: 80, display: 'flex', alignItems: 'center' }}>
    <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
    <line 
      x1="15%" 
      y1="50%" 
      x2="40%" 
      y2="50%" 
      stroke="#999" 
      strokeWidth="2" 
      strokeDasharray="4,4"  // Makes the line dotted
    />
    <line 
      x1="60%" 
      y1="50%" 
      x2="85%" 
      y2="50%" 
      stroke="#999" 
      strokeWidth="2" 
      strokeDasharray="4,4"  // Makes the line dotted
    />
  </svg>
      <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
        <Stack alignItems="center">
          <FlightTakeoffIcon />
          <Typography level="body-xs">{flight?.departureLocation}</Typography>
          <Typography level="body-sm">{formatDate(flight?.departureTime)}</Typography>
        </Stack>
        <Stack alignItems="center">
          <AirplanemodeActiveIcon />
          <Typography level="body-xs">
            {flight.stopCount ? `${flight.stopCount} Stops` : "Non Stop"}
          </Typography>
          <Typography level="body-sm">{formatDuration(flight?.elapsedTime)}</Typography>
        </Stack>
        <Stack alignItems="center">
          <FlightLandIcon />
          <Typography level="body-xs">{flight.arrivalLocation}</Typography>
          <Typography level="body-sm">{formatDate(flight.arrivalTime)}</Typography>
        </Stack>
      </Stack>
    </Box>
  </Stack>
);
const BaggageOption = ({ title, checkInBaggage, handBaggage, price, onSelect }) => (
  <Stack spacing={1} sx={{ width: '100%', border: '1px solid', borderColor: 'divider', p: 2, borderRadius: 'sm' }}>
    <Typography level="h6">{title}</Typography>
    <Divider />
    <Typography level="body-sm">Check-in Baggage: {checkInBaggage}</Typography>
    <Typography level="body-sm">Hand Baggage: {handBaggage}</Typography>
    <Typography level="h5">Rs {price}</Typography>
    <IconButton onClick={onSelect} variant="solid" color="primary">
      Select
    </IconButton>
  </Stack>
);

export default function FlightTicketCard({ flight, handleTicketSelect, handleRuleClick }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card variant="outlined" sx={{
      bgcolor: 'neutral.softBg',
      mb: 2,
      '&:hover': {
        boxShadow: 'lg',
        borderColor: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
      },
    }}>
      <CardContent>

        <Box sx={{ display: 'flex', gap: 5, justifyContent: 'center' }}>
          <Box sx={{ width: "70%" }}>

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              {flight?.api && (
                <Chip
                  variant="soft"
                  color="primary"
                  startDecorator={<WorkspacePremiumRoundedIcon />}
                  size="md"
                >
                  {flight?.api}
                </Chip>
              )}

            </Stack>

            <FlightInfo flight={flight.departure} isReturn={false} />

            {flight.return && (
              <React.Fragment>
                <Divider sx={{ my: 2 }} />
                <FlightInfo flight={flight.return} isReturn={true} />
              </React.Fragment>
            )}

            <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Baggage Options</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                  <BaggageOption
                    title="LITE"
                    checkInBaggage="Not Included"
                    handBaggage="1 piece"
                    price="69427"
                    onSelect={() => handleTicketSelect({ flight, baggageOption: 'LITE' })}
                  />
                  <BaggageOption
                    title="VALUE"
                    checkInBaggage="15 kg Included"
                    handBaggage="1 piece"
                    price="71427"
                    onSelect={() => handleTicketSelect({ flight, baggageOption: 'VALUE' })}
                  />
                  <BaggageOption
                    title="FLEX"
                    checkInBaggage="25 kg Included"
                    handBaggage="2 pieces"
                    price="75427"
                    onSelect={() => handleTicketSelect({ flight, baggageOption: 'FLEX' })}
                  />
                </Stack>
              </AccordionDetails>
            </Accordion>

          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}}
          >  <Typography level="title-lg">
              Total Fare: <strong>${flight.totalFare}</strong>
            </Typography>
            <AppButton text="View Details" onClick={() => handleRuleClick(flight.itineraries)} />
          </Box>

        </Box>
      </CardContent>
    </Card>
  );
}










//lined flight



// const FlightInfo = ({ flight, isReturn }) => (
//   <Stack spacing={2} sx={{ width: '100%' }}>
//     <Stack direction="row" spacing={2} justifyContent="space-between">
//       <Stack>
//         <Typography level="body-xs">Flight Number</Typography>
//         <Typography level="body-sm">{flight?.marketingFlightNumber}</Typography>
//       </Stack>
//       <Stack>
//         <Typography level="body-xs">Airline</Typography>
//         <Typography level="body-sm">{flight?.marketing}</Typography>
//       </Stack>
//       <Typography level="title-sm" color={isReturn ? "success" : "primary"}>
//         {isReturn ? "Return" : "Departure"}
//       </Typography>
//     </Stack>
//     <Box sx={{ position: 'relative', height: 80, display: 'flex', alignItems: 'center' }}>
//       <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
//         <line x1="10%" y1="50%" x2="45%" y2="50%" stroke="#999" strokeWidth="2" />
//         <line x1="55%" y1="50%" x2="90%" y2="50%" stroke="#999" strokeWidth="2" />
//       </svg>
//       <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
//         <Stack alignItems="center">
//           <FlightTakeoffIcon />
//           <Typography level="body-xs">{flight?.departureLocation}</Typography>
//           <Typography level="body-sm">{formatDate(flight?.departureTime)}</Typography>
//         </Stack>
//         <Stack alignItems="center">
//           <AirplanemodeActiveIcon />
//           <Typography level="body-xs">
//             {flight.stopCount ? `${flight.stopCount} Stops` : "Non Stop"}
//           </Typography>
//           <Typography level="body-sm">{formatDuration(flight?.elapsedTime)}</Typography>
//         </Stack>
//         <Stack alignItems="center">
//           <FlightLandIcon />
//           <Typography level="body-xs">{flight.arrivalLocation}</Typography>
//           <Typography level="body-sm">{formatDate(flight.arrivalTime)}</Typography>
//         </Stack>
//       </Stack>
//     </Box>
//   </Stack>
// );