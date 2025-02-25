import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

import Sidebar from '../../components/Sidebar';

import OrderList from '../../components/OrderList';
import Header from '../../components/Header';
import AgencyManagement from '../../pages-components/agencyManagement/AddAgency';
import DashboardMain from './DashboardMain';
import { useSelector } from 'react-redux';
import AppButton from '../../components/common/AppButton';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const AppDashboard = () => {
  const selectedOption = useSelector((state) => state.dashboard.option);
  const userData = useSelector((state) => state.user.loginUser)

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <Sidebar />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
            overflowY: 'auto'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="#some-link"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
              <Link
                underline="hover"
                color="neutral"
                // href="#some-link"
                fontSize={12}
                fontWeight={500}
              >
                Dashboard
              </Link>
              <Typography color="primary" fontWeight={500} fontSize={12}>
                {selectedOption}
              </Typography>
            </Breadcrumbs>
            <Box>
        
              <AppButton 
           
                
                text={
                  userData?.role === "super_admin"
                    ? "Admin Dashboard"
                    : userData?.role === "agency"
                      ? "Agency Dashboard"
                      : userData?.role === "sale"
                        ? "Sales Dashboard"
                        : "Dashboard"
                }
                startDecorator={<AdminPanelSettingsIcon />}
              />




            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              mb: 1,
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="h2" component="h1">
              {selectedOption}
            </Typography>
            {/* <Button
              color="primary"
              startDecorator={<DownloadRoundedIcon />}
              size="sm"
            >
              Download PDF
            </Button> */}
          </Box>



          <DashboardMain />
          {/* <ViewAgencyTable /> */}
          {/* <OrderList />  */}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}


export default AppDashboard;