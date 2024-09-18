import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Avatar,
  Box,
  Select,
  Option,
  Table,
  Typography,
  Sheet,
} from "@mui/joy";
import React from "react";
import CustomTypography from "../../components/common/CustomTyprography";

const DashboardAnalytics = () => {
  const handleChange = (event, newValue) => {
    // API call here for the data change
  };

  const cardsData = [
    {
      title: "Active Agencies",
      src: "/static/images/avatar/1.jpg",
      description: "20",
      alt: "a",
    },
    {
      title: "Todays Bookings",
      src: "/static/images/avatar/1.jpg",
      description: "200",
      alt: "a",
    },
    {
      title: "Revenue Per Agency",
      src: "/static/images/avatar/1.jpg",
      description: "Rs 22500",
      alt: "a",
    },
    {
      title: "Cash Received Today",
      src: "/static/images/avatar/1.jpg",
      description: "Rs 150000",
      alt: "a",
    },
  ];

  const chartData = [
    { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
    { name: "March", uv: 2000, pv: 9800, amt: 2290 },
    { name: "April", uv: 2780, pv: 3908, amt: 2000 },
    { name: "May", uv: 1890, pv: 4800, amt: 2181 },
    { name: "June", uv: 2390, pv: 3800, amt: 2500 },
    { name: "July", uv: 3490, pv: 4300, amt: 2100 },
    { name: "Aug", uv: 3490, pv: 4300, amt: 2100 },
    { name: "Sept", uv: 3490, pv: 8300, amt: 2100 },
    { name: "Oct", uv: 3490, pv: 4300, amt: 2100 },
    { name: "Nov", uv: 3490, pv: 4300, amt: 2100 },
    { name: "Dec", uv: 3490, pv: 4300, amt: 2100 },
  ];

  const flightSalesData = [
    { airline: "Emirates", totalSales: "$1,500,000", price: "$900", destination: "Dubai" },
    { airline: "Qatar Airways", totalSales: "$1,200,000", price: "$850", destination: "Doha" },
    { airline: "Singapore Airlines", totalSales: "$1,000,000", price: "$950", destination: "Singapore" },
    { airline: "British Airways", totalSales: "$900,000", price: "$800", destination: "London" },
    { airline: "Delta Airlines", totalSales: "$850,000", price: "$750", destination: "New York" },
  ];

  const agencySalesData = [
    { agencyName: "SkyHigh Travel", totalSales: "$2,000,000", bookings: "3,000", location: "USA" },
    { agencyName: "Global Tours", totalSales: "$1,800,000", bookings: "2,500", location: "UK" },
    { agencyName: "Luxury Travels", totalSales: "$1,600,000", bookings: "2,300", location: "France" },
    { agencyName: "Elite Voyages", totalSales: "$1,400,000", bookings: "2,000", location: "UAE" },
    { agencyName: "World Adventures", totalSales: "$1,200,000", bookings: "1,900", location: "Australia" },
    { agencyName: "FlyAway Services", totalSales: "$1,000,000", bookings: "1,800", location: "Canada" },
  ];

  return (
    <Box>
      {/* Cards Section */}
      <Box
        style={{
          display: "flex",
          backgroundColor: "white",
          height: "6rem",
          padding: "0px 3rem",
          alignItems: "center",
          border: "1px solid #CCD6E0",
          borderRadius: "10px",
        }}
        sx={{ boxShadow: "xl" }}
      >
        {cardsData.map((card, index) => (
          <Box style={{ width: "100%", border: "none" }} key={index}>
            <div style={{ display: "flex" }}>
              <div>
                <Avatar src={card?.src} />
              </div>
              <div style={{ margin: "0px 10px" }}>
                <CustomTypography>{card.title}</CustomTypography>
                <CustomTypography>{card.description}</CustomTypography>
              </div>
            </div>
          </Box>
        ))}
      </Box>

      {/* Chart Section */}
      <Sheet
        style={{ width: "100%", height: "28rem", marginTop: "20px" }}
        sx={{ boxShadow: "lg" }}
      >
        <Box
          style={{
            width: "100%",
            height: "4rem",
            display: "flex",
            marginBottom: "30px",
          }}
        >
          <Box
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              padding: "0px 2rem",
            }}
          >
            <Typography level="h3">Flight Counts</Typography>
          </Box>
          <Box
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              padding: "0px 2rem",
              alignItems: "center",
            }}
          >
            <Select
              defaultValue="This year"
              onChange={handleChange}
              size="sm"
              style={{
                height: "70%",
                width: "20%",
                color: "#CCD6E0",
                border: "1px solid #CCD6E0",
              }}
            >
              <Option value="this-year">This Year</Option>
              <Option value="last-year">Last Year</Option>
              <Option value="this-month">This Month</Option>
              <Option value="custom-range">Custom Range</Option>
            </Select>
          </Box>
        </Box>
        <Box style={{ width: "100%", height: "25rem" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Sheet>

      {/* Flight Sales Table */}
      <Box
        style={{
          width: "100%",
          height: "20rem",
          marginTop: "120px",
          display: "flex",
          border: "1px solid #CCD6E0",
          borderRadius: "10px",
        }}
      >
        <Box style={{ width: "60%", height: "100%" }}>
          <Box style={{ width: "100%", height: "5rem", display: "flex" }}>
            <Box style={{ width: "60%", display: "flex", alignItems: "center" }}>
              <Typography level="h3"> Flights with Highest Sales</Typography>
            </Box>
            <Box
              style={{
                width: "40%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Select
                defaultValue="This year"
                onChange={handleChange}
                size="sm"
                style={{
                  height: "50%",
                  width: "40%",
                  color: "#CCD6E0",
                  border: "1px solid #CCD6E0",
                }}
              >
                <Option value="this-year">This Year</Option>
                <Option value="last-year">Last Year</Option>
                <Option value="this-month">This Month</Option>
                <Option value="custom-range">Custom Range</Option>
              </Select>
            </Box>
          </Box>
          <Box style={{ width: "100%" }}>
            <Table aria-label="flight sales data">
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>Airline</th>
                  <th style={{ width: "30%" }}>Total Sales</th>
                  <th style={{ width: "20%" }}>Price</th>
                  <th style={{ width: "30%" }}>Destination</th>
                </tr>
              </thead>
              <tbody>
                {flightSalesData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.airline}</td>
                    <td>{row.totalSales}</td>
                    <td>{row.price}</td>
                    <td>{row.destination}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Box>
        </Box>
      </Box>
      
      {/* Additional Sales Data */}
      <Box style={{ width: "100%", marginTop: "20px" }}>
        <Typography level="h4">Agency Sales</Typography>
        <Table aria-label="agency sales data">
          <thead>
            <tr>
              <th>Agency Name</th>
              <th>Total Sales</th>
              <th>Bookings</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {agencySalesData.map((agency, index) => (
              <tr key={index}>
                <td>{agency.agencyName}</td>
                <td>{agency.totalSales}</td>
                <td>{agency.bookings}</td>
                <td>{agency.location}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default DashboardAnalytics;
