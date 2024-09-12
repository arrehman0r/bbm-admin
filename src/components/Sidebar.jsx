import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import LinearProgress from "@mui/joy/LinearProgress";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AlasamLogo from "./../images/alasamLogo.png"
import ColorSchemeToggle from "./ColorSchemeToggle";
import { closeSidebar } from "../utils";
import { agencyTabs, superAdminTabs } from "./utils/dashBoardTabs";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardOption } from "../redux/reducer/dashboardSlice";
import { setLoginUser } from "../redux/reducer/userSlice";
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import DashboardIcon from '@mui/icons-material/Dashboard';
function Toggler({ defaultExpanded = false, renderToggle, children }) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  const selectedOption = useSelector((state) => state.dashboard.option);
  const userData = useSelector((state) => state.user.loginUser)
  const handleLogout = () => {
    dispatch(setLoginUser(null));
    dispatch(setDashboardOption(null))
  };

  const dispatch = useDispatch();

  const handleOptionClick = (option) => {
    console.log("option is ", option);
    dispatch(setDashboardOption(option));
  };

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 100,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        {/* <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRoundedIcon />
        </IconButton> */}
        <img src={AlasamLogo} />
        {/* <Typography level="title-lg">Alasam.</Typography> */}
        {/* <ColorSchemeToggle sx={{ ml: 'auto' }} /> */}
      </Box>
      {/* <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" /> */}
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItemButton onClick={() => dispatch(setDashboardOption("Booking Engine"))} sx={{ backgroundColor: selectedOption === "Booking Engine" ? '#581E47' : "#fff" }} >
            <AirplaneTicketIcon />
            <ListItemContent>
              <Typography level="title-sm" sx={{
                color: selectedOption === "Booking Engine" ? "white" : "inherit",
                '&:hover': {
                  color: 'black',
                },
              }}>Booking Engine</Typography>
            </ListItemContent>

          </ListItemButton>
          <ListItemButton onClick={() => dispatch(setDashboardOption("Dashboard"))} sx={{ backgroundColor: selectedOption === "Dashboard" ? '#581E47' : "#fff" }} >
            <DashboardIcon />
            <ListItemContent>
              <Typography level="title-sm" sx={{
                color: selectedOption === "Dashboard" ? "white" : "inherit",
                '&:hover': {
                  color: 'black',
                },
              }}>Dashboard</Typography>
            </ListItemContent>

          </ListItemButton>
          {userData && (
            (userData.role === "super_admin" ? superAdminTabs : agencyTabs).map((item, index) => (
              <ListItem nested key={index}>
                <Toggler
                  renderToggle={({ open, setOpen }) => (
                    <ListItemButton onClick={() => setOpen(!open)}>
                      <AssignmentRoundedIcon color="#fff" />
                      <ListItemContent>
                        <Typography level="title-sm">{item.heading}</Typography>
                      </ListItemContent>
                      <KeyboardArrowDownIcon
                        sx={{ transform: open ? "rotate(180deg)" : "none" }}
                      />
                    </ListItemButton>
                  )}
                >
                  <List sx={{ gap: 0.5 }}>
                    {item.subheading.map((subitem, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          mt: 0.5,
                          backgroundColor:
                            selectedOption === subitem ? "#581E47" : "",
                        }}
                      >
                        <ListItemButton
                          onClick={() => handleOptionClick(subitem)}
                          sx={{
                            color: selectedOption === subitem ? "white" : "",
                          }}
                        >
                          {subitem}
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Toggler>
              </ListItem>
            ))
          )}

        </List>

        {/* <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton>
              <SupportRoundedIcon />
              Support
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <SettingsRoundedIcon />
              Settings
            </ListItemButton>
          </ListItem>
        </List> */}
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar
          variant="outlined"
          size="sm"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{userData.firstName} {userData.lastName}.</Typography>
          <Typography level="body-xs">{userData?.email}</Typography>
        </Box>
        <IconButton
          size="sm"
          variant="plain"
          color="neutral"
          onClick={handleLogout}
        >
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}
