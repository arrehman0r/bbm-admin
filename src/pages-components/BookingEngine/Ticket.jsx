import { Box } from "@mui/joy";
import React from "react";
import { formatDate, formatDuration } from "../../components/utils";
import AppButton from "../../components/common/AppButton";
import CustomTypography from "../../components/common/CustomTyprography";
const Ticket = ({ flight, handleTicketSelect }) => {
  return (
    <Box
      style={{
        height: "auto",
        backgroundColor: "white",
        borderRadius: "10px",
        display: "flex",
        boxShadow: "5px 10px;",
        width: "100%",
        border: "1px solid #CCD6E0",
      }}
    >
      <Box
        style={{
          width: "75%",
          height: "100%",
          padding: "10px 5px",
        }}
      >
        <Box
          style={{
            width: "100%",
            height: "auto",
            padding: "20px 10px 0px 10px",
            display: "flex",
            justifyContent: "space-around",
            gap:"30px"
          }}
        >
          <Box
            style={{
              display: "flex",
              width: "20%",
              gap: "5px",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CustomTypography >Flight Number</CustomTypography>
            <CustomTypography>
              {flight.departure.marketingFlightNumber}
            </CustomTypography>
          </Box>
          <Box
            style={{
              display: "flex",
              width: "10%",
              gap: "5px",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CustomTypography >Airline</CustomTypography>

            <CustomTypography>{flight.departure.marketing}</CustomTypography>
          </Box>

          <Box style={{ display: "flex", gap: "10px", width: "70%" }}>
            <Box
              style={{
                width: "30%",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <CustomTypography >
                {flight.departure.departureLocation}
              </CustomTypography>{" "}
              <CustomTypography >
                {flight.departure.departureTime}
              </CustomTypography>
            </Box>
            <Box
              style={{
                padding: "0px 10px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              {" "}
              <Box style={{ width: "75px", border: "1px solid black" }}></Box>
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                width: "20%",
              }}
            >
              <CustomTypography>
                {flight.departure.stopCount
                  ? `${flight.departure.stopCount} Stops`
                  : "Non Stop"}
              </CustomTypography>
              <CustomTypography>
                {formatDuration(flight.departure.elapsedTime)}
              </CustomTypography>
            </Box>
            <Box
              style={{
                padding: "0px 10px",

                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              {" "}
              <Box style={{ width: "75px", border: "1px solid black" }}></Box>
            </Box>
            <Box
              style={{
                width: "30%",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <CustomTypography >
                {flight.departure.arrivalLocation}
              </CustomTypography>{" "}
              <CustomTypography >
                {flight.departure.arrivalTime}
              </CustomTypography>
            </Box>
          </Box>
        </Box>

        {flight.return && (
          <Box
            style={{
              width: "100%",
              height: "auto",
              padding: "20px 20px 0px 20px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Box
              style={{
                display: "flex",
                width: "20%",
                gap: "5px",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <CustomTypography >Flight Number</CustomTypography>
              <CustomTypography>
                {flight.return.marketingFlightNumber}
              </CustomTypography>
            </Box>
            <Box
              style={{
                display: "flex",
                width: "10%",
                gap: "5px",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <CustomTypography >Airline</CustomTypography>

              <CustomTypography>{flight.return.marketing}</CustomTypography>
            </Box>

            <Box style={{ display: "flex", gap: "10px", width: "70%" }}>
              <Box
                style={{
                  width: "30%",
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <CustomTypography >
                  {flight.return.departureLocation}
                </CustomTypography>{" "}
                <CustomTypography >
                  {flight.return.departureTime}
                </CustomTypography>
              </Box>
              <Box
                style={{
                  padding: "0px 10px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {" "}
                <Box style={{ width: "75px", border: "1px solid black" }}></Box>
              </Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "20%",
                }}
              >
                <CustomTypography>
                  {flight.return.stopCount
                    ? `${flight.return.stopCount} Stops`
                    : "Non Stop"}
                </CustomTypography>
                <CustomTypography>
                  {formatDuration(flight.return.elapsedTime)}
                </CustomTypography>
              </Box>
              <Box
                style={{
                  padding: "0px 10px",

                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {" "}
                <Box style={{ width: "75px", border: "1px solid black" }}></Box>
              </Box>
              <Box
                style={{
                  width: "30%",
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <CustomTypography >
                  {flight.return.arrivalLocation}
                </CustomTypography>{" "}
                <CustomTypography >
                  {flight.return.arrivalTime}
                </CustomTypography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      <Box
        style={{
          width: "25%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column-reverse",
          padding: "10px",
          gap: "1rem",
        }}
      >
        <AppButton
          bgColor="#581E47"
          borderColor="#581E47"
          color="white"
          text="Select"
          onClick={() => handleTicketSelect({ flight })}
        />
        <CustomTypography level="h3">
          Total Fare: {`${flight.totalFare}$`}
        </CustomTypography>
        {/* <CustomTypography 
           sx={{
            fontSize: {
              xs:"0.4rem",
              sm:"0.6rem",
              md:"0.8rem",
              lg:"1rem",
              xl:"1.2rem",
            } 
           }} 
            >Taxes:{" "}
                  {flight.taxSummaries.map((tax, idx) => (
                    <span key={idx}>
                      <CustomTypography  
                      style={{ fontSize: "0.8rem" }}
                      >{tax.type}: ${tax.amount}</CustomTypography>
                    </span>
                  ))}</CustomTypography> */}

        <CustomTypography>
          Adult Price: ${flight.adultPrice} x {flight.totalAdults}
        </CustomTypography>
      </Box>
    </Box>
  );
};

export default Ticket;
