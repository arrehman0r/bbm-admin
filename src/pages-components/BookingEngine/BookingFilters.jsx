import * as React from "react";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails, {
  accordionDetailsClasses,
} from "@mui/joy/AccordionDetails";
import AccordionSummary, {
  accordionSummaryClasses,
} from "@mui/joy/AccordionSummary";
import Switch from "@mui/joy/Switch";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import ListItemContent from "@mui/joy/ListItemContent";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import AirplanemodeActiveRoundedIcon from "@mui/icons-material/AirplanemodeActiveRounded";
import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import BluetoothRoundedIcon from "@mui/icons-material/BluetoothRounded";
import TapAndPlayRoundedIcon from "@mui/icons-material/TapAndPlayRounded";
import EditNotificationsRoundedIcon from "@mui/icons-material/EditNotificationsRounded";
import AdUnitsRoundedIcon from "@mui/icons-material/AdUnitsRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccessibilityNewRoundedIcon from "@mui/icons-material/AccessibilityNewRounded";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import SpatialTrackingRoundedIcon from "@mui/icons-material/SpatialTrackingRounded";
import SettingsVoiceRoundedIcon from "@mui/icons-material/SettingsVoiceRounded";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import Slider from "@mui/joy/Slider";
import PaidIcon from "@mui/icons-material/Paid";
import { Box, Radio, RadioGroup } from "@mui/joy";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { TravelOptions } from "../../components/utils/constants";
export default function BookingFilters() {
  return (
    <Box
      sx={{
        width: "25%",
        height: "auto",
        borderRadius: "10px",
        display: {
          xs: "none",
          sm: "none",
          md: "none",
          lg: "block",
          xl: "block",
        },
      }}
    >
      <AccordionGroup
        variant="plain"
        transition="0.2s"
        sx={{
          border: "1px solid #CCD6E0",
          maxWidth: 400,
          borderRadius: "md",
          [`& .${accordionDetailsClasses.content}.${accordionDetailsClasses.expanded}`]:
            {
              paddingBlock: "1rem",
            },
          [`& .${accordionSummaryClasses.button}`]: {
            paddingBlock: "1rem",
          },
        }}
      >
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
                <Switch size="md" />
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
                <Box sx={{ display: "flex", gap: 1 }}>
                  <PaidIcon fontSize="xl2" />
                  <FormLabel sx={{ m: 0 }}>Range</FormLabel>
                </Box>
                <Slider defaultValue={3} max={10} />
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
              <Typography level="title-md">Accessibility</Typography>
              <Typography level="body-sm">
                Toggle your accessibility settings
              </Typography>
            </ListItemContent>
          </AccordionSummary>
          <AccordionDetails>
            <RadioGroup name="accessibility-options" defaultValue="economy">
              <Stack>
                {TravelOptions.map((option) => (
                  <FormControl
                    key={option.value}
                    orientation="horizontal"
                    sx={{ gap: 1 }}
                  >
                    <ZoomInRoundedIcon fontSize="xl2" sx={{ mx: 1 }} />
                    <FormLabel>{option.label}</FormLabel>
                    <Radio value={option.value} size="sm" />
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
