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
  Button,
  Card,
  Option,
  Radio,
  RadioGroup,
  Select,
  Sheet,
  Table,
  Typography,
} from "@mui/joy";
import React, { PureComponent } from "react";
import CustomTypography from "../../components/common/CustomTyprography";

const DashboardAnalytics = () => {
  const handleChange = (event, newValue) => {
    // alert(`You chose "${newValue}"`);
  };
  const cards = [
    {
      title: "Download Alasam App",
      src: "/static/images/avatar/1.jpg",
      description: "20.48",
      alt: "a",
    },
    {
      title: "Help Center",
      src: "/static/images/avatar/1.jpg",
      description: "20.6",
      alt: "a",
    },
    {
      title: "Manage Bookings",
      src: "/static/images/avatar/1.jpg",
      description: "225",
      alt: "a",
    },
    {
      title: "Download Alasam App",
      src: "/static/images/avatar/1.jpg",
      description: "150",
      alt: "a",
    },
  ];

  const data = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "March",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "April",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "June",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "July",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Aug",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Sept",
      uv: 3490,
      pv: 8300,
      amt: 2100,
    },
    {
      name: "Oct",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Nov",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Dec",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <Box>
      <Box
        style={{
          display: "flex",
          backgroundColor: "white",
          height: "6rem",
          padding: "0px 3rem",
          alignItems: "center",
          border: "1px solid cyan",
          borderRadius: "10px",
        }}
        sx={{ boxShadow: "xl" }}
      >
        {cards.map((card, index) => (
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
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <Radio value="Male" label="Male" variant="outlined" />
            <Radio value="Female" label="Female" variant="outlined" />
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
                color: "blue",
                border: "1px solid blue",
              }}
            >
              <Option value="dog">Dog</Option>
              <Option value="cat">Cat</Option>
              <Option value="fish">Fish</Option>
              <Option value="bird">Bird</Option>
            </Select>
          </Box>
        </Box>
        <Box style={{ width: "100%", height: "25rem" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
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

      <Box
        style={{
          width: "100%",
          height: "20rem",
          marginTop: "120px",
          display: "flex",
          border: "1px solid cyan",
          borderRadius: "10px",
        }}
      >
        <Box style={{ width: "60%", height: "100%" }}>
          <Box
            style={{ width: "100%", height: "5rem", display: "flex" }}
            sx={{ px: "40px" }}
          >
            <Box
              style={{ width: "60%", display: "flex", alignItems: "center" }}
            >
              <Typography level="h3"> Flights who sell more</Typography>
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
                  color: "blue",
                  border: "1px solid blue",
                }}
              >
                <Option value="dog">Dog</Option>
                <Option value="cat">Cat</Option>
                <Option value="fish">Fish</Option>
                <Option value="bird">Bird</Option>
              </Select>
            </Box>
          </Box>
          <Box style={{ width: "100%" }}>
            <Table aria-label="basic table">
              <thead>
                <tr>
                  <th style={{ width: "40%" }}>Dessert (100g serving)</th>
                  <th>Calories</th>
                  <th>Fat&nbsp;(g)</th>
                  <th>Carbs&nbsp;(g)</th>
                  <th>Protein&nbsp;(g)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Frozen yoghurt</td>
                  <td>159</td>
                  <td>6</td>
                  <td>24</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>Ice cream sandwich</td>
                  <td>237</td>
                  <td>9</td>
                  <td>37</td>
                  <td>4.3</td>
                </tr>
                <tr>
                  <td>Eclair</td>
                  <td>262</td>
                  <td>16</td>
                  <td>24</td>
                  <td>6</td>
                </tr>
                <tr>
                  <td>Cupcake</td>
                  <td>305</td>
                  <td>3.7</td>
                  <td>67</td>
                  <td>4.3</td>
                </tr>
                <tr>
                  <td>Gingerbread</td>
                  <td>356</td>
                  <td>16</td>
                  <td>49</td>
                  <td>3.9</td>
                </tr>
              </tbody>
            </Table>
          </Box>
        </Box>
        <Box style={{ width: "40%", height: "100%" }}>
          <Box
            style={{ width: "100%", height: "5rem", display: "flex" }}
            sx={{ px: "40px" }}
          >
            <Box
              style={{ width: "60%", display: "flex", alignItems: "center" }}
            >
              <Typography level="h3"> Forms</Typography>
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
                  width: "50%",
                  color: "blue",
                  border: "1px solid blue",
                }}
              >
                <Option value="dog">Dog</Option>
                <Option value="cat">Cat</Option>
                <Option value="fish">Fish</Option>
                <Option value="bird">Bird</Option>
              </Select>
            </Box>
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                borderRadius: "100px",
                border: "2rem solid cyan",
                width: "12rem",
                height: "12rem",
                borderTop: "2rem solid green",
                animation: "spin 2s linear infinite",
              }}
            ></Box>
          </Box>
        </Box>
      </Box>

      <Box
        style={{
          width: "100%",
          height: "25rem",
          marginTop: "30px",
          border: "1px solid cyan",
          borderRadius: "10px",
        }}
      >
        <Box
          style={{ width: "100%", height: "5rem", display: "flex" }}
          sx={{ px: "40px" }}
        >
          <Box style={{ width: "60%", display: "flex", alignItems: "center" }}>
            <Typography level="h3">Flights Task</Typography>
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
                width: "25%",
                color: "blue",
                border: "1px solid blue",
              }}
            >
              <Option value="dog">Dog</Option>
              <Option value="cat">Cat</Option>
              <Option value="fish">Fish</Option>
              <Option value="bird">Bird</Option>
            </Select>
            <Select
              defaultValue="This year"
              onChange={handleChange}
              size="sm"
              style={{
                height: "50%",
                width: "25%",
                color: "blue",
                border: "1px solid blue",
                marginLeft: "10px",
              }}
            >
              <Option value="dog">Dog</Option>
              <Option value="cat">Cat</Option>
              <Option value="fish">Fish</Option>
              <Option value="bird">Bird</Option>
            </Select>
          </Box>
        </Box>
        <Table aria-label="basic table">
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Dessert (100g serving)</th>
              <th>Calories</th>
              <th>Fat&nbsp;(g)</th>
              <th>Carbs&nbsp;(g)</th>
              <th>Protein&nbsp;(g)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Frozen yoghurt</td>
              <td>159</td>
              <td>6</td>
              <td>24</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Ice cream sandwich</td>
              <td>237</td>
              <td>9</td>
              <td>37</td>
              <td>4.3</td>
            </tr>
            <tr>
              <td>Eclair</td>
              <td>262</td>
              <td>16</td>
              <td>24</td>
              <td>6</td>
            </tr>
            <tr>
              <td>Cupcake</td>
              <td>305</td>
              <td>3.7</td>
              <td>67</td>
              <td>4.3</td>
            </tr>
            <tr>
              <td>Gingerbread</td>
              <td>356</td>
              <td>16</td>
              <td>49</td>
              <td>3.9</td>
            </tr>
            <tr>
              <td>Cupcake</td>
              <td>305</td>
              <td>3.7</td>
              <td>67</td>
              <td>4.3</td>
            </tr>
            <tr>
              <td>Ice cream sandwich</td>
              <td>237</td>
              <td>9</td>
              <td>37</td>
              <td>4.3</td>
            </tr>
          </tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default DashboardAnalytics;
