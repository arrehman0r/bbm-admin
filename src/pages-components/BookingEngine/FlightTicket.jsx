import React from "react";
import { Card, CardContent, Typography, Divider, Stack, Grid } from "@mui/joy";
import { formatDate, formatDuration } from "../../components/utils";
import AppButton from "../../components/common/AppButton";

const FlightTicket = ({ flight, handleTicketSelect }) => {
  return (
    <Card variant="outlined" sx={{ width: '100%', mb: 2, borderRadius: 'lg' }}>
      <CardContent>
        <Stack spacing={2}>
          {/* Departure Flight Information */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography level="h6">Departure</Typography>
              <Typography level="body1">
                {flight.departure.departureLocation} at{" "}
                {formatDate(flight.departure.departureTime)}
              </Typography>
              <Typography level="body2">
                {formatDate(flight.departure.departureTime)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography level="h6">Arrival</Typography>
              <Typography level="body1">
                {flight.departure.arrivalLocation} at{" "}
                {new Date(flight.departure.arrivalTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
              <Typography level="body2">
                {new Date(flight.departure.arrivalTime).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>

          <Divider />

          {/* Departure Flight Details */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography level="body2">
                Flight Number: {flight.departure.marketingFlightNumber}
              </Typography>
              <Typography level="body2">Airline: {flight.departure.marketing}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography level="body2">
                Duration: {formatDuration(flight.departure.elapsedTime)}
              </Typography>
              <Typography level="body2">
                Stops: {flight.departure.stopCount ? `${flight.departure.stopCount} stop(s)` : "Non-stop"}
              </Typography>
            </Grid>
          </Grid>

          <Divider />
          {flight.return &&
            <Grid>
              {/* Return Flight Information */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography level="h6">Return</Typography>
                  <Typography level="body1">
                    {flight.return.departureLocation} at{" "}
                    {formatDate(flight.return.departureTime)}
                  </Typography>
                  <Typography level="body2">
                    {formatDate(flight.return.departureTime)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography level="h6">Arrival</Typography>
                  <Typography level="body1">
                    {flight.return.arrivalLocation} at{" "}
                    {new Date(flight.return.arrivalTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                  <Typography level="body2">
                    {new Date(flight.return.arrivalTime).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>

              <Divider />

              {/* Return Flight Details */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography level="body2">
                    Flight Number: {flight.return.marketingFlightNumber}
                  </Typography>
                  <Typography level="body2">Airline: {flight.return.marketing}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography level="body2">
                    Duration: {formatDuration(flight.return.elapsedTime)}
                  </Typography>
                  <Typography level="body2">
                    Stops: {flight.return.stopCount ? `${flight.return.stopCount} stop(s)` : "Non-stop"}
                  </Typography>
                </Grid>
              </Grid>

            </Grid>
          }
          <Divider />

          {/* Fare Information */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography level="body1">
                Total Fare: ${flight.totalFare}
              </Typography>
              <Typography level="body2">
                Adult Price: ${flight.adultPrice} x {flight.totalAdults}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography level="body2">
                Taxes:{" "}
                {flight.taxSummaries.map((tax, idx) => (
                  <span key={idx}>
                    {tax.type}: ${tax.amount}{" "}
                  </span>
                ))}
              </Typography>
            </Grid>
            <Grid item xs={6}>
            <AppButton text="Select" onClick={() => handleTicketSelect({ flight })} />
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FlightTicket;
